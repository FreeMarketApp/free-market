import { useState, useEffect } from 'react'

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
    <h1 className="text-3xl font-bold underline">
    </h1>
  )
}