const { Router } = require("express")
const MovieControllers = require("../controllers/MovieControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const movieRouter = Router()

const movieControllers = new MovieControllers()

movieRouter.use(ensureAuthenticated)

movieRouter.get("/", movieControllers.index)
movieRouter.post("/", movieControllers.create)
movieRouter.get("/:id", movieControllers.show)
movieRouter.delete("/:id", movieControllers.delete)

module.exports = movieRouter
