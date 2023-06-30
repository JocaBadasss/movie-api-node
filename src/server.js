const express = require("express")
const database = require("./database/sqlite")

const app = express()

database()





const PORT = 3334

app.listen(PORT, () => console.log(`APP IS RUNNING ON PORT ${PORT}`))
