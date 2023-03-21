const Post = require("../models/post")
const User = require("../models/user")
const { postCensor } = require("../utils/postCensor")

exports.createPost = async (req, res) => {
    const { description, tags, anonymous, type } = req.body
    const isOk = await postCensor(description)
    if (!isOk)
        return res.status(400).json({ status: "error", message: "cannot post" })
    if (!req.body.force)
        return res.status(200).json({ status: "ok", similarPosts: {} })
    const post = await Post.create({
        description,
        tags,
        anonymous,
        type,
        postedBy: req.id,
    })
    res.status(201).json({ status: "ok", post })
}
exports.getAllPost = async (req, res) => {
    const post = await Post.find()
    res.status(200).json({ status: "ok", post })
}

exports.generateTags = async (req, res) => {}

const generateSimilarPost = (post) => {}
