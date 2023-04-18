require('dotenv').config()
require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;

const dbx = new Dropbox({ refreshToken: process.env.DB_REFRESH_TOKEN, clientId: process.env.DB_APP_KEY, clientSecret: process.env.DB_APP_SECRET});

export default async function getDropboxUserAccount() {
    dbx.usersGetCurrentAccount()
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
}
