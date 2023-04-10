import { useSession, signIn, signOut } from "next-auth/react"
import Router from "next/router";
import { useEffect, useState } from "react"

export default function SignIn() {
  const [userUsername, setUserUsername] = useState("")
  const [userPass, setUserPass] = useState("")
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      Router.replace('/');
    }
  },[status])

  async function signInUser() {
    const signInCredentials = await signIn("credentials", {username: userUsername, password: userPass, redirect: false, callbackUrl: "https://www.google.com"})
    if (signInCredentials?.error === null) {
      alert("successfully signed in")
      Router.replace(signInCredentials?.url === null ? "/" : signInCredentials.url)
    } else {
      alert("not successful")
    }
    console.log(signInCredentials)
  }

  return (
    status === "loading" ? <>Loading...</> :
    <>
      <form>
        <label>Username: <input type="text" name="username" onChange={(event) => setUserUsername(event?.target.value)}></input></label>
        <label>Password: <input type="password" name="password" onChange={(event) => setUserPass(event?.target.value)}></input></label>
        <button type="button" onClick={() => signInUser()}>Sign in</button>
      </form>
    </>
  )
}
