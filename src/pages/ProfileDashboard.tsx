import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfileDashboard() {
  const {data, status} = useSession();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    console.log('username data: ', data?.user.username);
    console.log('status: ', status)
  }, [status, data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(file)
    const formData = new FormData()
    console.log('username data 2: ', data?.user.username);
    if (file !== undefined) {
      formData.append("profile-picture", file);
      formData.append("username", data?.user.username);
      fetch("/api/dropbox/uploadImage",{
        method: "POST",
        headers: {
          "content-type": "multipart/form-data"
        },
        body: formData
      }).then((result) => {
        console.log(result)
      })
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Profile Upload:
        <input type="file" onChange={(event) => handleOnChange(event)}/>
        <button type="submit">Upload</button>
      </label>
    </form>
    </>
  )
}