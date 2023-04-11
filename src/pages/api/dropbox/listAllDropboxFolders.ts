import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bodyParams = {
    "include_deleted": false,
    "include_has_explicit_shared_members": false,
    "include_media_info": false,
    "include_mounted_folders": true,
    "include_non_downloadable_files": true,
    "path": "",
    "recursive": false
}
  fetch("https://api.dropboxapi.com/2/files/list_folder",
    {
    method: "POST",
    headers: { Authentication: `Bearer ${process.env.ACCESS_TOKEN}`,
    'content-type': 'application/json;charset=UTF-8'},
    body: JSON.stringify(bodyParams),
  }).then((response) => {
    console.log(response)
    res.status(200).json(response)
  })
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
