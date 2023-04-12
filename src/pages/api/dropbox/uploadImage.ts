import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import fs from 'fs';
import { Dropbox } from 'dropbox';
import { formidable } from 'formidable';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

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
  const session = await getServerSession(req, res, authOptions);
  console.log('session: ', session);
  const currentUser = session?.user.username;

  if (req.method === "POST") {
    console.log('(server side) current user: ', currentUser);
    // console.log('body: ', req.body);
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      console.log('SERVER FILE OBJECT: ', files);
      console.log('SERVER FILE OBJECT DEEPER: ', files.file.filepath);
      const data = fs.readFileSync(files.file.filepath);
      console.log('data :', data)
      dbx.filesUpload({path: `/users/${currentUser}/profile/profile.jpg`, contents: data})
      .then((response) => {
        res.status(200).json(response);
      }).catch((error) => {
        console.log(error.error);
      })
    });
    // const data = new Promise((resolve, reject) => {
    //   const form = new formidable()

    //   form.parse(req, (err, fields, files) => {
    //     if (err) reject({err});
    //     resolve(({err, fields, files}));
    //   })
    // })
    // dbx.filesListFolder({ path: `/users/${currentUser}/profile` })
    //   .then(function (response) {
    //     console.log("folder response: ", response.result.entries);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    // res.status(200);
  }
}