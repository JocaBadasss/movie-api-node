const { Router } = require("express")
const TagsControllers = require("../controllers/TagsControllers")

const tagsRouter = Router()

const tagsControllers = new TagsControllers()

tagsRouter.get("/:user_id", tagsControllers.index)


module.exports = tagsRouter
