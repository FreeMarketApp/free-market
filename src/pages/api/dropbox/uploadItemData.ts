import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
import { createMenuItem, updateMenuItemPhoto, getUserInfo, getMenuItemById } from "../database";
import fs from "fs";
import { Dropbox } from "dropbox";
import { IncomingForm } from "formidable";
import { getSession } from "next-auth/react";
import { responseData } from "@/types/apihelper";
import { menu_items } from "@prisma/client";

const dbx = new Dropbox({ refreshToken: process.env.DB_REFRESH_TOKEN, clientId: process.env.DB_APP_KEY, clientSecret: process.env.DB_APP_SECRET});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  let currentUser:string = "";
  const errors: string[] = [];

  //initial response data
  let responseData: responseData = {
    content:null,
    status:200,
    hasError:false,
    error:""
  }

  if(!session){
    return res.status(401).send("User session not found");
  }
  
  currentUser = session.user.username;

  if (req.method === "POST") {
    const form = new IncomingForm();
    let viewableLink:string = "";

    const userInfo = await getUserInfo(currentUser);

    // console.log('userInfo: ', userInfo);

    form.parse(req, async (err, fields, files) => {
      const data = fs.readFileSync(files.file.filepath);
      console.log('fields: ', fields);
      console.log('form data: ', data);
      if (userInfo !== null && userInfo.user_store !== null) {
        const current_item: menu_items = {
          id: 0,
          item_name: fields.itemName.toString(),
          item_price: fields.itemPrice.toString(),
          item_photo: "",
          user_store_id: userInfo?.user_store?.id
        }
        const new_menu_item = await createMenuItem(current_item)
        console.log("item being added: ", current_item);

        await dbx.filesUpload({path: `/users/${userInfo.username}/food_images/item_image_${new_menu_item.id}.jpg`, contents: data});
        let shared_link = await dbx.sharingCreateSharedLinkWithSettings({path: `/users/${userInfo.username}/food_images/item_image_${new_menu_item.id}.jpg`});
        const replaced_link = shared_link.result.url.replace("dl=0", "raw=1");

        await updateMenuItemPhoto(replaced_link, new_menu_item.id);
        const new_menu_item_details = await getMenuItemById(new_menu_item.id);

        responseData.content = new_menu_item_details;
        return res.status(responseData.status).send(responseData);
      }

      return res.status(responseData.status).send(responseData);
    });
  }
}