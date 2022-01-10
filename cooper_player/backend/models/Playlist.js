const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "need a user id"]
    },
    song: [{
        type: mongoose.Schema.ObjectId,
        ref: "Song"
    }]

})

module.exports =  mongoose.model("Playlist", playlistSchema)