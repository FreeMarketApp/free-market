import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import { updateUserProfileImg } from '../database';
import fs from 'fs';
import { Dropbox } from 'dropbox';
import { IncomingForm } from 'formidable';
// import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getSession } from 'next-auth/react';

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, authOptions);
  const session = await getSession({req});
  if(!session){
    return res.status(400).send("No session found");
  }
  const currentUser = session.user.username

  if (req.method === "POST") {
    console.log('(server side) current user: ', currentUser);
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // console.log('SERVER FILE: ', files);
      console.log('SERVER FIELDS', fields);
    })
    //   console.log('SERVER FILE OBJECT DEEPER: ', files.file.filepath);
    //   const data = fs.readFileSync(files.file.filepath);
    //   console.log('data :', data)
    //   try {
    //     await dbx.filesDeleteV2({path: `/users/${currentUser}/profile/profile.jpg`})
    //   } catch (error) {
    //     console.log('catch error: ', error);
    //   }

    //   // await dbx.filesUpload({path: `/users/${currentUser}/profile/profile.jpg`, contents: data })

    //   dbx.filesUpload({path: `/users/${currentUser}/profile/profile.jpg`, contents: data})
    //   .then((response) => {
    //     dbx.sharingCreateSharedLinkWithSettings({path: `/users/${currentUser}/profile/profile.jpg`})
    //     .then((linkResponse) => {
    //       const viewableLink = linkResponse.result.url.replace('dl=0', 'raw=1');
    //       updateUserProfileImg(currentUser, viewableLink).then((updateUserRes) => {
    //         res.status(200).json(viewableLink)
    //       }).catch((error)  => {
    //         console.log(error);
    //       })
    //     })
    //   }).catch((error) => {
    //     console.log(error.error);
    //   })
    // });
  }
}