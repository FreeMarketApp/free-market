import type { NextApiRequest, NextApiResponse } from "next";
import { getAllMenuItems, getUserInfo } from "./database";
import { getSession } from "next-auth/react";
import { responseData } from "@/types/apihelper";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<responseData>
  ) {
    const session = await getSession({ req });
    let currentUser:string = "";
    const errors: string[] = [];
  
    //initial response data
    let responseData: responseData = {
      content:null,
      status:200,
      hasError:false,
      error:""
    }
  
    if(!session){
      responseData.hasError = true;
      responseData.error = "User session not found"
      return res.status(401).send(responseData);
    }
    currentUser = session.user.username;
    const userInfo = await getUserInfo(currentUser);

    if(userInfo == null) {
      responseData.hasError = true;
      responseData.error = "NO USER FOUND"
      return res.status(200).send(responseData);
    }

    if(userInfo.user_store != null){
        const all_menu_items = await getAllMenuItems(userInfo.user_store.id);   
        responseData.content = all_menu_items

        return res.status(200).send(responseData);
    }

    responseData.hasError = true;
    responseData.error = "ERROR"
    return res.status(200).send(responseData);
  }