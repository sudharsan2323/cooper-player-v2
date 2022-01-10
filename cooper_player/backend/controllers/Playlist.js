const Playlist = require("../models/Playlist");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.addSongPlaylist = async (req, res, next) => {
    const playlist = await Playlist.findById({
        _id: req.params.playlistId,
        user: req.params.userId,
    });
    const currsong = playlist.song;
    let bool = false
    currsong.forEach(cur => {
        if(cur.toString() === req.params.songId.toString()){
            bool = true
            return
        }
    });
    if(bool){
        return res.status(409).json({message: "song already added to the playlist"})
    }
    currsong.push(req.params.songId);
    playlist.song = currsong;
    await playlist.save();
    return res.status(200).json({ message: "song added to playlist" });
};

exports.createPlaylist = async (req, res, next) => {
    const isExistPlaylist = await Playlist.findOne({
        playlistName: req.body.playlistName,
    });
    if (isExistPlaylist) {
        return res.status(403).json({
            error: "name is already taken",
        });
    }

    const newPlaylist = await new Playlist(req.body);

    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(400).json({ message: "user is invalid" });
    }
    const userplaylist = user.playlist;
    userplaylist.push(newPlaylist._id);
    user.playlist = userplaylist;

    newPlaylist.user = req.params.userId

    await user.save();
    await newPlaylist.save();
    return res.status(200).json({ message: "new playlist is created" });
};

exports.deletePlaylist = async (req, res, next) => {
    const id = req.params.playlistId;
    const playlist = await Playlist.findById({ _id: id });
    if (!playlist) {
        return res.status(400).json({
            error: "playlist does'nt exist",
        });
    }
    const user = await User.findById(req.params.userId).populate("playlist");
    const userPlaylist = user.playlist;
    const newUserplaylist = userPlaylist.filter(
        (playlists) => playlists.playlistName !== playlist.playlistName
    );
    user.playlist = newUserplaylist;
    await user.save();

    playlist.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.json({ message: "playlist deleted" });
    });
};

exports.viewPlaylist = async (req, res, next) => {
    const user = await User.findById({ _id: req.params.userId })
        .select("-hasded_password -salt")
        .populate("playlist");

    if(user.playlist.length === 0){
        return res.status(400).json({message: "no playlist found"})
    }
    return res.status(200).json({ user });
};

exports.viewSongPlaylist = async(req, res, next) => {
    const playlist =  await Playlist.findById({_id: req.params.playlistId}).populate("song")
    if(!playlist){
        return next(new ErrorResponse("no playlist found", 400))
    }
    return res.status(200).json({playlist})
}

exports.deleteSongPlaylist = async (req, res, next) => {
    const playlist = await Playlist.findById({ _id: req.params.playlistId });
    if(!playlist){
        return res.status(400).json({message: "playlist not found"})
    }
    const deleteSong = playlist.song;
    if(!deleteSong){
        return res.status(400).json({message: "song not found"})
    }

    const songId = req.params.songId.toString();

    const newSongList = deleteSong.filter((song) => {
        return songId !== song.toString();
    });
    playlist.song = newSongList;
    playlist.save();
    return res.status(200).json({ message: "success" });
};
