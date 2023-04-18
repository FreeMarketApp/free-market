import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { user, menu_items, user_store } from "@prisma/client";
import { responseData } from "@/types/apihelper";


export default function AllMenuItems() {
    const {data, status} = useSession();
    const [menuData, setMenuData] = useState<menu_items[]>([]);
    const [userInfo, setUserInfo] = useState<user>();

    useEffect(() => {
        const retrieveUserInfo = async () => {
            const result = await fetch("/api/getUserInfo");
            const jsonResult:(user & {
                user_store: user_store | null;
            }) = await result.json();
           
            setUserInfo(jsonResult);
          }

    
        const getAllMenuItems = async () => {
            const menu_items_result = await fetch("/api/getAllMenuItems");
            let jsonResult: responseData = await menu_items_result.json();

            if(!jsonResult.hasError) {
                setMenuData(await jsonResult.content);
            }
        }
        
        const retrieveUserAndMenu = async () => {
            await retrieveUserInfo();
            await getAllMenuItems();
        }

        retrieveUserAndMenu();
    }, [])

    console.log(menuData);

    return (
        <>
        {
            menuData.map((singleItem) => {
                <SingleItemDisplay singleItem={singleItem} key={singleItem.id}/>
            })
        }
        </>
    )
}
