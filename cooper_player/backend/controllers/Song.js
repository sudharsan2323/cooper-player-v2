const Song = require("../models/Song")

exports.Allsongs = (req, res, next) => {
    Song.find({})
        .then((song) => {
            if(song.length === 0){
                return res.status(400).json({message: "no song found"})
            }
            return res.json({song})
        })
        .catch((err) => {
            return res.status(400).json({err})
        })
}