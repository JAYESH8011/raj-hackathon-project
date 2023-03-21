const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const homeRoute = require("./routes/homeRoute")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
require("./config/conn").connect()
const path = require("path")
const { postCensor } = require("./utils/postCensor")

const app = express()

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "templates/views"))
app.use(express.static("./public"))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(morgan("tiny"))

app.use("/", homeRoute)
app.use("/", userRoute)
app.use("/", postRoute)
app.get("/censor", async (req, res) => {
    const isOk = await postCensor("gand mara bsdk")
    console.log(isOk)
    res.send("hello")
})

module.exports = app
