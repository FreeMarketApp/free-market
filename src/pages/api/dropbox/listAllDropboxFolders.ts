import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbx.filesListFolder({ path: '' })
    .then(function (response) {
      console.log("folder response: ", response.result.entries);
    })
    .catch(function (error) {
      console.error(error);
    });
  res.status(200)
}

// require('isomorphic-fetch'); // or another library of choice.
// var Dropbox = require('dropbox').Dropbox;

// const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

// export default async function listAllFoldersInRoot() {
//     dbx.filesListFolder({path: ''})
//     .then(function(response) {
//       console.log("folder response: ", response.entries);
//     })
//     .catch(function(error) {
//       console.error(error);
//     });
// }
