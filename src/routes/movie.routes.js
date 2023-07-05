const { Router } = require("express")
const MovieControllers = require("../controllers/MovieControllers")

const movieRouter = Router()

const movieControllers = new MovieControllers()

movieRouter.get("/", movieControllers.index)
movieRouter.post("/:user_id", movieControllers.create)
movieRouter.get("/:id", movieControllers.show)
movieRouter.delete("/:id", movieControllers.delete)

module.exports = movieRouter
