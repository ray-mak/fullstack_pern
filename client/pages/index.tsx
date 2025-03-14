import React from "react"
import { useEffect, useState } from "react"

type Message = {
  question: string
  answer: string
}

function index() {
  const [message, setMessage] = useState<Message[]>([])
  const [showIndex, setShowIndex] = useState<Number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/home")
        const data = await response.json()
        console.log(data)
        setMessage(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  function showAnswer(index: Number) {
    setShowIndex(index)
  }

  return (
    <div>
      <div>
        {message.map((item, index) => {
          return (
            <div
              key={index}
              className="border w-40 overflow-hidden"
              onClick={() => showAnswer(index)}
            >
              <div>{item.question}</div>
              <div
                className={`${
                  index == showIndex ? "max-h-40" : "max-h-0"
                } transition-all`}
              >
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default index
