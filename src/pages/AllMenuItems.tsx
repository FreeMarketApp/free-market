import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { user, menu_items, user_store } from "@prisma/client";
import { responseData } from "@/types/apihelper";
import SingleItemDisplay from "./SingleItemDisplay";


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
                setMenuData(await jsonResult.content.menu_items);
            }
        }
        
        const retrieveUserAndMenu = async () => {
            await retrieveUserInfo();
            await getAllMenuItems();
        }

        retrieveUserAndMenu();
    }, [])

    const deleteItem = async (item_id: number) => {

        await fetch('/api/dropbox/deleteItem', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item_id)
        })
    }

    return (
        <>
        <div>All Menu Items</div>
        {
            menuData.map((singleItem) => (
                <div key={singleItem.id}>
                    <SingleItemDisplay singleItem={singleItem}/>
                    <button onClick={() => deleteItem(singleItem.id)}>Delete Item</button>
                </div>
            ))
        }
        </>
    )
}
