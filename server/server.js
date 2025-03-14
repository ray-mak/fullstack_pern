const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 8080

app.use(cors())

app.get("/api/home", (req, res) => {
  res.json([
    {
      question: "Question1",
      answer: "Answer1",
    },
    {
      question: "Question2",
      answer: "Answer2",
    },
    {
      question: "Question3",
      answer: "Answer3",
    },
    {
      question: "Question4",
      answer: "Answer4",
    },
  ])
})

// app.use("api/forum", require("./routes/forumRoutes"))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
