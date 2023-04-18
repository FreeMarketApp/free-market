import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import { Dropbox } from 'dropbox';
import { DropboxAuth } from 'dropbox';

const dbx = new Dropbox({ refreshToken: process.env.DB_REFRESH_TOKEN, clientId: process.env.DB_APP_KEY, clientSecret: process.env.DB_APP_SECRET});
// const dbx_auth = new DropboxAuth({ clientId: process.env.DB_APP_KEY, clientSecret: process.env.DB_APP_SECRET});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const dbxAuthURL = await dbx_auth.getAuthenticationUrl("http://localhost:3000", undefined, 'code', 'offline', undefined, undefined, undefined);
  // const dbxAccessCode = await dbx_auth.getAccessTokenFromCode("http://localhost:3000", "91vKbc5S1YAAAAAAAAAAbH8q3utqXX635BL4tv-8FyI");

  // console.log('AUTH URL: ', dbxAuthURL);
  // console.log("Access Code: ", dbxAccessCode);

  dbx.filesListFolder({ path: '' })
    .then(function (response) {
      console.log("folder response: ", response.result.entries);
    })
    .catch(function (error) {
      console.error(error);
    });
  res.status(200)
}