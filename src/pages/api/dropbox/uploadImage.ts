import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import { getSession } from 'next-auth/react';
import { Dropbox } from 'dropbox';
import formidable from 'formidable';

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
  const session = await getSession();
  console.log(session);

  // if (req.method === "POST") {
  //   console.log(req)
  //   const data = new Promise((resolve, reject) => {
  //     const form = new formidable()

  //     form.parse(req, (err, fields, files) => {
  //       if (err) reject({err});
  //       resolve(({err, fields, files}));
  //     })
  //   })
    // dbx.filesListFolder({ path: '' })
    //   .then(function (response) {
    //     console.log("folder response: ", response.result.entries);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    // res.status(200).json({
    //   status: 'ok',
    //   data
    // })
  // }
}