// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {getAllSellers} from './database'
import { getSession } from 'next-auth/react';
const bcrypt = require("bcrypt")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session2 = await getSession({req});
  console.log('session2', session2);
  const results = await getAllSellers()
  res.status(200).json(results)
}
