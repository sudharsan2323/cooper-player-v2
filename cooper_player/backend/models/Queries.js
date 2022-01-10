const mongoose = require("mongoose")

const queriesSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "need a user to write a queries"]
    },
})

module.exports =  mongoose.model("Queries", queriesSchema)