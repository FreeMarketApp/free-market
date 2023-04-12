import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import SignUp from './SignUp'
import { user } from '@prisma/client';

export default function Home() {
  const [userData, setAllUserData] = useState([]);
  const {status, data} = useSession();
  const [dropBoxUser, setDropBoxUser] = useState([]);

  useEffect(() => {
    fetch('/api/getAllSellerInfo').then((response) => {
      response.json().then((data) => {
        setAllUserData(data);
      })
    })
  }, [])

  useEffect(() => {
    fetch('/api/dropbox/listAllDropboxFolders')
  }, [])

  useEffect(() => {
    console.log("status: ", status)
    console.log("data: ", data?.user)
    if (status === "unauthenticated") {
      Router.replace("/SignIn")
    }
  }, [status, data])

  return (
    status === "loading" ? <> Loading...</> :
    <>
        <h1 className="text-3xl font-bold underline"></h1>
        <div>Home Page</div>
        <button onClick={() => signOut()}>Sign Out</button>
        <button onClick={() => Router.replace("/ProfileDashboard")}>Profile</button>
        <table>
          <tbody>
          {
            userData.map((singleUserData:user) =>
            <tr key={singleUserData.username}>
              <td>{singleUserData.firstname}</td>
              <td>{singleUserData.lastname}</td>
              <td>{singleUserData.username}</td>
              <td>{singleUserData.phonenumber}</td>
              <td>{singleUserData.email}</td>
            </tr>
            )
          }
          </tbody>
        </table>
    </>
  )
}
