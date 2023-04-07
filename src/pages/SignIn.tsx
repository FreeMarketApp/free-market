import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
  const [userUsername, setUserUsername] = useState("")
  const [userPass, setUserPass] = useState("")

  return (
    <>
      <form>
        <label>Username: <input type="text" name="username" onChange={(event) => setUserUsername(event?.target.value)}></input></label>
        <label>Password: <input type="password" name="password" onChange={(event) => setUserPass(event?.target.value)}></input></label>
        <button type="button" onClick={() => signIn("credentials", {username: userUsername, password: userPass})}>Sign in</button>
      </form>
    </>
  )
}