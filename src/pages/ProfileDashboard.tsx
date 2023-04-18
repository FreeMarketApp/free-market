import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { user } from "@prisma/client";
import Image from "next/image";
import ItemComponent from "./ItemComponent";
import AllMenuItems from "./AllMenuItems";
import { responseData } from "@/types/apihelper";

export default function ProfileDashboard() {
  const {data, status} = useSession();
  const [file, setFile] = useState<File>();
  const [userInfo, setUserInfo] = useState<user>();

  const retrieveUserInfo = async () => {
    const result = await fetch("/api/getUserInfo");
    const jsonResult:user = await result.json();
   
    setUserInfo(jsonResult);
  }

  useEffect(() => {
    retrieveUserInfo();
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('file',file)
    const formData = new FormData()
    if (file !== undefined) {
      formData.append("file", file);

      let response = await fetch("/api/dropbox/uploadImage",{
        method: "POST",
        body: formData
      });

      let data:responseData = await response.json();

      if(!data.hasError){
        await retrieveUserInfo();
      }
      else{
        console.log(data.error);
      }
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  }

  let profile_image:string = userInfo?.profile_img != null ? userInfo.profile_img : "";

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Profile Upload:
        <input type="file" onChange={(event) => handleOnChange(event)}/>
        <button type="submit">Upload</button>
      </label>
    </form>
    <Image src={profile_image} alt="profile-img" width={200} height={200}/>
    <ItemComponent/>
    <AllMenuItems/>
    </>
  )
}