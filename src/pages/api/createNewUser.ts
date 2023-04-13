// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {createNewUser} from './database'
import { Dropbox } from "dropbox";
import { error } from 'console';

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<user>
) {
  if (req.method === "POST") {
    bcrypt.hash(req.body.password, 10, async (err: any, hash: any) => {
      req.body.password = hash
      let newUser = await createNewUser(req.body);
      const folderPaths = [`/users/${newUser.username}`, `/users/${newUser.username}/profile`, `/users/${newUser.username}/food_images`]
      dbx.filesCreateFolderBatch({paths: folderPaths}).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
      res.status(200).json(newUser)
    })
  }
}
