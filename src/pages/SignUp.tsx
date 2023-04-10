import { useState, useEffect, InputHTMLAttributes, FormEventHandler } from "react";
import { user } from "@prisma/client";
import { error } from "console";
import Router from "next/router";

const newUser: user = {
  id: 0,
  createddate: new Date(),
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  phonenumber: "",
  password: "",
  seller: false,
}

export default function SignUp() {
  const [userSignUpData, setUserSignUpData] = useState(newUser)

  function handleUserDataChange(evt: React.ChangeEvent<HTMLInputElement> ) {
    if (evt.target.name === "seller") {
      setUserSignUpData({...userSignUpData, [evt.target.name]: evt.target.checked})
    } else {
      setUserSignUpData({...userSignUpData, [evt.target.name]: evt.target.value})
    }
  }

  function handleUserDataSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt?.preventDefault()
    console.log(userSignUpData)
    fetch('/api/createNewUser',
    {
      method: "POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(userSignUpData)
    }).then((response) => {
      Router.replace("/SignIn")
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
    <form onSubmit={handleUserDataSubmit}>
      <label>Email: <input type="text" name="email" onChange={handleUserDataChange}/></label>
      <label>Username: <input type="text" name="username" onChange={handleUserDataChange}/></label>
      <label>Password: <input type="text" name="password" onChange={handleUserDataChange}/></label>
      <label>First Name: <input type="text" name="firstname" onChange={handleUserDataChange}/></label>
      <label>Last Name: <input type="text" name="lastname" onChange={handleUserDataChange}/></label>
      <label>Phone Number: <input type="text" name="phonenumber" onChange={handleUserDataChange}/></label>
      <label>Are you a seller? <input type="checkbox" name="seller" onChange={handleUserDataChange}/></label>
      <input type="submit" value="Submit" />
    </form>
    </>
  )
}

SignUp.auth = false