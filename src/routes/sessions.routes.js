const router = require("express")

const SessionsControllers = require("../controllers/SessionsControllers")

const sessionsControllers = new SessionsControllers()

const sessionsRoutes = router()

sessionsRoutes.post("/", sessionsControllers.create)

module.exports = sessionsRoutes
