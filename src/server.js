require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")

const app = express()
app.use(express.json())

app.use(routes)

database()

const PORT = 3334

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error(error)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
})

app.listen(PORT, () => console.log(`APP IS RUNNING ON PORT ${PORT}`))
