const { Router } = require("express")
const TagsControllers = require("../controllers/TagsControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const tagsRouter = Router()

const tagsControllers = new TagsControllers()

tagsRouter.get("/", ensureAuthenticated, tagsControllers.index)

module.exports = tagsRouter
