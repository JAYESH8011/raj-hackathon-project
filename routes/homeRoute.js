const express = require("express")
const { home } = require("../controllers/homeController")
const { isLoggedIn, firstTimeCheck } = require("../middlewares/userMiddlewares")
const router = express.Router()

router.route("/").get(isLoggedIn, firstTimeCheck, home)

module.exports = router
