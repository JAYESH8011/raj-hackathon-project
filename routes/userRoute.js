const express = require("express")
const {
    adminUserCreate,
    userLogin,
    firstTimeChangePassword,
    userLogout,
} = require("../controllers/userController")
const {
    isLoggedIn,
    checkRole,
    firstTimeCheck,
} = require("../middlewares/userMiddlewares")
const router = express.Router()

router
    .route("/adminUserCreate")
    .post(isLoggedIn, checkRole("admin"), firstTimeCheck, adminUserCreate)
router.route("/userLogin").post(userLogin)
router
    .route("/firstTimeChangePassword")
    .post(isLoggedIn, firstTimeChangePassword)
router.route("/logout").get(userLogout)

module.exports = router
