require('dotenv').config()
require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });


export default async function getDropboxUserAccount() {
    dbx.usersGetCurrentAccount()
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
}
