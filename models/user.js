const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: [40, "name must be less than 40 charcter"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exist"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must be atleast 6 character long"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    domain: {
        type: Array,
    },
    firstTime: {
        type: Boolean,
        default: true,
    },
    Karma: {
        type: Number,
        default: 0,
    },
    notification: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})
userSchema.methods.isValidatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
    return token
}
module.exports = mongoose.model("User", userSchema)
