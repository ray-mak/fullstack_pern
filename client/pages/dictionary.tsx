import React from "react"
import { useState, useEffect } from "react"

type Word = {
  word: string
  meanings: Meanings[]
}

type Definition = {
  definition: string
}

type Meanings = {
  partOfSpeech: string
  definitions: Definition[]
}

const dictionary = () => {
  const [definitions, setDefinitions] = useState<Word[]>([])
  const [word, setWord] = useState<string>("")
  const [wordBank, setWordBank] = useState<string[]>([])

  const [wordInput, setWordInput] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWordInput(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!wordBank.includes(wordInput)) {
      setWordBank((prevState) => [...prevState, wordInput])
      setWord(wordInput)
    }
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )
        const data = await res.json()
        setDefinitions((prevState) => [...data, ...prevState])
      } catch (error) {
        console.error(error)
      }
    }
    if (word === "") {
      return
    } else {
      fetchDefinition()
    }
  }, [word])
  return (
    <div className="w-full h-full p-20">
      <div className="border p-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="word-input">Enter a Word</label>
          <input
            id="word-input"
            className="border ml-4 rounded-md p-1"
            value={wordInput}
            onChange={handleChange}
            type="text"
          ></input>
          <button className="border ml-4 px-4 py-1 rounded-md bg-blue-50">
            Get Definition
          </button>
        </form>
      </div>
      <div>
        {definitions.map((item, index) => {
          return (
            <div key={index} className="border">
              <p className="text-xl font-semibold">{item.word}</p>
              <div className="ml-2">
                {item.meanings.map((meaning, index) => {
                  return (
                    <div key={`${meaning.partOfSpeech}-${index}`}>
                      <p className="text-lg font-medium">
                        {meaning.partOfSpeech}
                      </p>
                      <div>
                        {meaning.definitions.map((definition, index) => {
                          return (
                            <div
                              key={`${definition}-${index}`}
                              className="ml-2"
                            >
                              -{definition.definition}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default dictionary
