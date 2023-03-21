const { cookieToken } = require("../utils/cookieToken")
const User = require("../models/user")

exports.adminUserCreate = async (req, res) => {
    const body = req.body
    body.password = "test@123"
    console.log(body)
    try {
        const user = await User.create({ ...body })
        user.password = undefined
        cookieToken(user, res)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: "error",
        })
    }
}
exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "email and password is invalid",
            })
        }
        const validatePassword = await user.isValidatePassword(password)
        if (!validatePassword) {
            return res.status(400).json({
                status: "error",
                message: "email and password is invalid",
            })
        }
        //check for user first time and redirect
        user.password = undefined
        cookieToken(user, res)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "error",
        })
    }
}
exports.userLogout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        status: "ok",
        message: "successfully logout",
    })
}
exports.adminAllUsers = async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        status: "ok",
        users,
    })
}
exports.getSingleUser = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "provide the id in url",
        })
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "user not found",
        })
    }
    res.status(200).json({
        status: "ok",
        user,
    })
}
exports.firstTimeChangePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    console.log(req.body)
    const id = req.id
    try {
        const user = await User.findById(id).select("+password")
        console.log(user)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user is invalid",
            })
        }
        const validatePassword = await user.isValidatePassword(oldPassword)
        if (!validatePassword) {
            return res.status(400).json({
                status: "error",
                message: "oldPassword is wrong",
            })
        }
        user.password = newPassword
        user.firstTime = false
        await user.save()
        console.log(user)
        res.status(200).json({
            status: "ok",
        })
    } catch (error) {
        console.log(error)
        req.status(400).json({
            status: "error",
        })
    }
}
