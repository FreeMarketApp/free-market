import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { user } from "@prisma/client";
import Image from "next/image";


export default function ItemComponent(){
    const {data, status} = useSession();
    const [file, setFile] = useState<File>();
    const [item, setItem] = useState({
        itemName: '',
        itemPrice: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Upload file: ", file)
        const formData = new FormData()
        if (file !== undefined) {
          formData.append("file", file);
          formData.append("itemName", item.itemName);
          formData.append("itemPrice", item.itemPrice);
          fetch("/api/dropbox/uploadItemData",{
            method: "POST",
            body: formData
          }).then(async (result) => {
            console.log('result from server: ', await result.json())
          })
        console.log("Form data: ", formData);
        }
      }
    
      const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
          console.log(event.target.files[0]);
          setFile(event.target.files[0]);
        } else {
            setItem({...item, [event.target.name]: event.target.value});
        }
      }
    

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Item Picture Upload:<input type="file" onChange={(event) => handleOnChange(event)}/></label>
            <label>Name of Item: <input type="text" name="itemName" onChange={(event) => handleOnChange(event)}/></label>
            <label>Price Input: <input type="text" name="itemPrice" onChange={(event) => handleOnChange(event)}/></label>
            <button type="submit">Upload</button>
        </form>
        </>
    )
}