const { Router } = require("express")

const userRoutes = require("./users.routes")
const movieRoutes = require("./movie.routes")
const tagsRoutes = require("./tags.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/movies", movieRoutes)
routes.use("/tags", tagsRoutes)



module.exports = routes