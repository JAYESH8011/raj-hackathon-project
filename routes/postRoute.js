const express = require("express")
const { createPost, getAllPost } = require("../controllers/postController")
const {
    isLoggedIn,
    checkRole,
    firstTimeCheck,
} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.route("/createPost").post(isLoggedIn, firstTimeCheck, createPost)
router.route("/getAllPost").get(isLoggedIn, firstTimeCheck, getAllPost)
module.exports = router
