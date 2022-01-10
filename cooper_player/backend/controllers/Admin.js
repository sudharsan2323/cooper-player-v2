const Playlist = require("../models/Playlist")
const Queries = require("../models/Queries")
const Song = require("../models/Song")
const User = require("../models/User")
const cloudinary = require("../utils/cloudinary");
exports.addSong = async (req, res, next) => {
    const songExist = await Song.findOne({songTitle: req.body.songTitle})
    if(songExist){
        return res.status(400).json({
            error: "song already exist"
        })
    }
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" , folder:"cooper"});
    
    const song = await new Song({
        songTitle: req.body.songTitle,
        songUrl: result.secure_url,
        song_cloudinary_id: result.public_id,
        status: req.body.status
    })
    await song.save()
    return res.json({message: "song added"})
}

exports.deleteSong = async (req, res, next) => {
    const song = await Song.findOne({_id: req.params.songId})
    if(!song){
        return res.status(400).json({message: "song does'nt exist"})
    }
    await cloudinary.uploader.destroy(song.song_cloudinary_id, {resource_type: 'raw'});
    const allPlaylist = await Playlist.find({}).populate("song")
    if(allPlaylist.length !== 0) {
        allPlaylist.map((playlist, index)=> {
            const newSongList = playlist.song.filter(single => {
                return single.songTitle !== song.songTitle
            })
            allPlaylist[index].song = newSongList
            
            console.log(allPlaylist[index].song);
        })

    }
    for(let i = 0; i < allPlaylist.length; i+=1){

        await allPlaylist[i].save()
    }
    song.remove((err, song) => {
        if(err){
            return res.status(400).json({
                err: err
            })
        }
        return res.json({message: "song has been deleted"})
    })
}

exports.addPlan = async(req, res, next) => {
    const user = await User.findByIdAndUpdate({_id: req.params.userId}, {status: true}, {new:true})
    
    return res.status(200).json({message: "plan updated"})
}
exports.removePlan = async(req, res, next) => {
    const user = await User.findByIdAndUpdate({_id: req.params.userId}, {status: false}, {new:true})
    
    const playlists = await Playlist.find({user: req.params.userId}).populate("song")

    if(!playlists){
        return res.status(400).json({message: "no playlist found"})
    }
    playlists.forEach((playlist) => {
        const newPlaylistSong = playlist.song.filter(single => !single.status)
        playlist.song = newPlaylistSong
    })

    for (let v of playlists){
        await v.save()
    }


    

    return res.status(200).json({message: "plan updated", user})
}

exports.displayQueries = async(req, res, next) => {
    const queries = await Queries.find({}).populate("user", "-password")
    if(!queries){
        return res.status(404).json({message: "no queries found"})
    }
    
    return res.status(200).json({queries})
}

