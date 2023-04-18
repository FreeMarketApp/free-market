import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
import { updateUserProfileImg } from "../database";
import fs from "fs";
import { Dropbox } from "dropbox";
import { IncomingForm } from "formidable";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getSession } from "next-auth/react";
import { responseData } from "@/types/apihelper";

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

    form.parse(req, async (err, fields, files) => {
      const data = fs.readFileSync(files.file.filepath);

      await dbx.filesDeleteV2({ path: `/users/${currentUser}/profile/profile.jpg` }).catch((error) => errors.push(error));

        try{
          await dbx.filesUpload({path: `/users/${currentUser}/profile/profile.jpg`, contents: data })
          // throw "server error";
        }
        catch(err){
          responseData.hasError = true;
          responseData.error = err;
          return res.status(200).send(responseData);
        }
     
        try{
          let sharedLink = await dbx.sharingCreateSharedLinkWithSettings({ path: `/users/${currentUser}/profile/profile.jpg`});
          viewableLink = sharedLink.result.url.replace("dl=0", "raw=1");
        }
        catch(err){
          responseData.hasError = true;
          responseData.error = err;
          return res.status(200).send(responseData);
        }

        try{
          updateUserProfileImg(currentUser, viewableLink)
        }
        catch(error){
          responseData.hasError = true;
          responseData.error = error;
          return res.status(200).send(responseData);
        }
      
        //if we reach here then all process was successfull return success status

        responseData.content = viewableLink;
        return res.status(responseData.status).send(responseData);

      
      // dbx
      //   .filesUpload({
      //     path: `/users/${currentUser}/profile/profile.jpg`,
      //     contents: data,
      //   })
      //   .then((response) => {
      //     dbx
      //       .sharingCreateSharedLinkWithSettings({
      //         path: `/users/${currentUser}/profile/profile.jpg`,
      //       })
      //       .then((linkResponse) => {
      //         const viewableLink = linkResponse.result.url.replace(
      //           "dl=0",
      //           "raw=1"
      //         );
      //         updateUserProfileImg(currentUser, viewableLink)
      //           .then((updateUserRes) => {
      //             res.status(200).json(viewableLink);
      //           })
      //           .catch((error) => {
      //             console.log(error);
      //           });
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error.error);
      //   });
    });
  }
}
