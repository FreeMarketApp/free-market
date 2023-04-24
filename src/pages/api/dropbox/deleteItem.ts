import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
import { Dropbox } from "dropbox";
import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

const dbx = new Dropbox({ refreshToken: process.env.DB_REFRESH_TOKEN, clientId: process.env.DB_APP_KEY, clientSecret: process.env.DB_APP_SECRET});


// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('request ', req.body);
    const session = await getSession({req});
    console.log('session ', session);
    let currentUser:string = "";
    const errors: string[] = [];

    if(!session) {
        return res.status(401).send("User session not found");
    }

    currentUser = session.user.username;
    console.log('current user', currentUser)

    // if (req.method === "POST") {
    //     const form = new IncomingForm();

    //     form.parse(req, async (err, fields, files) => {
    //         console.log('fields: ', fields)
    //       })
    //     }
}