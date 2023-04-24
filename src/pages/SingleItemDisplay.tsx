import { useState, useEffect, FunctionComponent } from "react";
import { menu_items } from "@prisma/client";
import Image from "next/image";
import PropTypes, { InferProps } from "prop-types";
import { responseData } from "@/types/apihelper";

type Props = {
    singleItem: menu_items
}

export default function SingleItemDisplay({singleItem}: Props) {
    const [currentItem, setCurrentItem] = useState(singleItem)
    const [isEdit, setIsEdit] = useState(false);
    const [file, setFile] = useState<File>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setFile(event.target.files[0]);
        } else {
            setCurrentItem({...currentItem, [event.target.name]: event.target.value});
        }
    }

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsEdit(!isEdit)
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("file", file);
        }
        
        formData.append("currentItem", JSON.stringify(currentItem));

        let response = await fetch("/api/dropbox/updateItemData", {
            method: "POST",
            body: formData
        });
        
        const updatedItemDetails: responseData = await response.json()

        setCurrentItem(updatedItemDetails.content);
    }

    function readItemDisplay() {
        return (
            <>
                <Image src={currentItem.item_photo} alt="menu-item-img" width={100} height={100} resource=""/>
                <div>{currentItem.item_name}</div>
                <div>${currentItem.item_price}</div>
                <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
            </>
        )
    }

    function editItemDisplay() {
        return (
            <>
                <form onSubmit={handleEditSubmit}>
                    <Image src={currentItem.item_photo} alt="menu-item-img" width={100} height={100} resource=""/>
                    <input type="file" onChange={(event) => handleImageChange(event)} />
                    <input name="item_name" value={currentItem.item_name} onChange={handleImageChange}/>
                    <input name="item_price" value={currentItem.item_price} onChange={handleImageChange}/>
                    <button type="submit">Update Item</button>
                </form>
            </>
        )
    }


    return (
        <>
        {
            isEdit ? editItemDisplay() : readItemDisplay()
        }
        </>
    )
}