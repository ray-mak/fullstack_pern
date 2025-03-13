import React from "react"
import { useEffect, useState } from "react"

function index() {
  const [message, setMessage] = useState("Loading")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/home")
        const data = await response.json()
        console.log(data)
        setMessage(data.message)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return <div>{message}</div>
}

export default index
