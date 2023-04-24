import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
import { updateMenuItemDetails, updateMenuItemPhoto, getUserInfo, getMenuItemById } from "../database";
import fs from "fs";
import { Dropbox } from "dropbox";
import { IncomingForm } from "formidable";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
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

    const userInfo = await getUserInfo(currentUser);

    form.parse(req, async (err, fields, files) => {
        let itemJSON: menu_items = JSON.parse(fields.currentItem.toString());
        console.log('Item being updated: ', itemJSON);

        if (files.file) {
          const data = fs.readFileSync(files.file.filepath);
          console.log('new image upload ', data)
          await dbx.filesDeleteV2({path: `/users/${userInfo?.username}/food_images/item_image_${itemJSON.id}.jpg`}).catch((error) => console.log('error: ', error));
          await dbx.filesUpload({path: `/users/${userInfo?.username}/food_images/item_image_${itemJSON.id}.jpg`, contents: data});
          let shared_link = await dbx.sharingCreateSharedLinkWithSettings({path: `/users/${userInfo?.username}/food_images/item_image_${itemJSON.id}.jpg`});
          console.log('sharable link :', shared_link)
          const replaced_link = shared_link.result.url.replace("dl=0", "raw=1");
          itemJSON.item_photo = replaced_link;
        } else {
          itemJSON.item_photo = '';
        }
      
        await updateMenuItemDetails(itemJSON);

        const new_menu_item_details = await getMenuItemById(itemJSON.id);
        responseData.content = new_menu_item_details;
        return res.status(responseData.status).send(responseData);
      })
    }
  }