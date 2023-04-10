// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {getAllUsers, getUserInfo} from './database'
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let unHashed = req.body.password

  if (req.method === "POST") {
    console.log("request body password ", req.body.password)
    const currentUserLogin = await getUserInfo(req.body.username)
    console.log("current User login ", currentUserLogin)
    if (currentUserLogin === null) {
      return null
    }
    bcrypt.compare(unHashed, currentUserLogin?.password, (err, response) => {
      console.log("password", response)
      if (response === true) {
        res.status(200).json({username: req.body.username})
      } else {
        res.status(200).json(null)
      }
    })
  }
  // const results = await getAllUsers()
  // res.status(200).json(results)
}
