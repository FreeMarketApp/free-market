// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {createNewUser} from './database'
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<user>
) {
  if (req.method === "POST") {
    bcrypt.hash(req.body.password, 10, async (err: any, hash: any) => {
      req.body.password = hash
      let newUser = await createNewUser(req.body)
      res.status(200).json(newUser)
    })
  }
}
