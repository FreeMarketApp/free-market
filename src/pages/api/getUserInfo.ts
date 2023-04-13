// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserInfo} from './database'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);
  const results = await getUserInfo(session?.user.username);
  res.status(200).json(results)
}
