import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import SignUp from './SignUp'

export default function Home() {
  const [userData, setAllUserData] = useState([]);
  const {status, data} = useSession();

  useEffect(() => {
    fetch('/api/server').then((response) => {
      response.json().then((data) => {
        setAllUserData(data);
      })
    })
  }, [])

  // useEffect(() => {
  //   console.log(status)
  //   if (status !== "authenticated") {
  //     Router.replace("/SignIn")
  //   }
  // }, [status])

  return (
    <>
      <h1 className="text-3xl font-bold underline"></h1>
      <div>Sign up here!</div>
    </>
  )
}
