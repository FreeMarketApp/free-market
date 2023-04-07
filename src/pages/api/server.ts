// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {getAllUsers} from './database'
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let unHashed = req.body.password
  let currPass = "$2b$10$h/ETBR1aQ3rY9T8vRHaZduakQrEJpnPEEOmliYWWjjncZ1T26GSd."
  console.log(req)
  if (req.method === "POST") {
    console.log("body", req.body)
    // bcrypt.compare(unHashed, currPass, (err, response) => {
    //   console.log("password", response)
    //   if (response === true) {
    //     res.status(200).json({username: req.body.username})
    //   } else {
    //     res.status(200)
    //   }
    // })
    res.status(200).json({username: req.body.username})
  }
  // const results = await getAllUsers()
  // res.status(200).json(results)
}
