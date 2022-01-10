const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songTitle: {
        type: String,
        require: true
    },
    songUrl: {
        type: String,
        require: true
    },
    song_cloudinary_id:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        require: true
    },
})
module.exports =  mongoose.model("Song", songSchema)