import { useState, useEffect } from 'react'
import SignUp from './SignUp'

export default function Home() {
  const [userData, setAllUserData] = useState([])
  useEffect(() => {
    fetch('/api/server').then((response) => {
      response.json().then((data) => {
        setAllUserData(data)
      })
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold underline"></h1>
      <SignUp/>
    </div>
  )
}