const { Router } = require("express")
const UserControllers = require("../controllers/UserControllers")

const userRouter = Router()

const userControllers = new UserControllers()

userRouter.post("/", userControllers.create)
userRouter.put("/:id", userControllers.update)

module.exports = userRouter
