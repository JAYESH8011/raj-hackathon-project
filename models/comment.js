const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    answer: {
        type: Boolean,
    },
    replies: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            description: {
                type: String,
            },
            upvote: {
                type: Number,
            },
        },
    ],
    upvote: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Comment", commentSchema)
