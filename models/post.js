const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    upvote: {
        type: Number,
        default: 0,
    },
    tags: {
        type: Array,
        required: true,
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    comment: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment",
        },
    ],
    answered: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Post", postSchema)
