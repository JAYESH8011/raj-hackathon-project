const jwt = require("jsonwebtoken")
const User = require("../models/user")

exports.firstTimeCheck = async (req, res, next) => {
    const id = req.id
    const user = await User.findById(id)
    if (user.firstTime) {
        return res.render("changepass")
    }
    next()
}
exports.isLoggedIn = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.render("login")
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.render("login")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("after decoded")
    if (!decoded) {
        console.log("inside decoded")
        return res.render("login")
    }
    req.id = decoded.id
    next()
}
exports.checkRole = (role) => {
    return async (req, res, next) => {
        try {
            const id = req.id
            const user = await User.findById(id)
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "user not exist",
                })
            }
            if (user.role === role) {
                req.user = user
                return next()
            }
            return res.status(400).json({
                status: "error",
                message: "user not authorized",
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: "error",
            })
        }
    }
}
