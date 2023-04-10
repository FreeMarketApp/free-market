// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {getAllSellers} from './database'
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const results = await getAllSellers()
  res.status(200).json(results)
}
