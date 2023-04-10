import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import SignUp from './SignUp'
import { user } from '@prisma/client';

export default function Home() {
  const [userData, setAllUserData] = useState([]);
  const {status, data} = useSession();

  useEffect(() => {
    fetch('/api/getAllSellerInfo').then((response) => {
      response.json().then((data) => {
        setAllUserData(data);
      })
    })
  }, [])

  useEffect(() => {
    console.log("status: ", status)
    if (status === "unauthenticated") {
      Router.replace("/SignIn")
    }
  }, [status, data])

  return (
    status === "loading" ? <> Loading...</> :
    <>
        <h1 className="text-3xl font-bold underline"></h1>
        <div>Home Page</div>
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
