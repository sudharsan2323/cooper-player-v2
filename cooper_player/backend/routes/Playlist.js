const express = require("express")
const { createPlaylist, addSongPlaylist, viewPlaylist, deletePlaylist, deleteSongPlaylist, viewSongPlaylist } = require("../controllers/Playlist")
const {protect} = require("../middleware/auth")
const { playlistValidation } = require("../validators")

const router = express.Router()



router.post("/new/user/:userId", protect, playlistValidation,createPlaylist)
router.delete("/:playlistId/user/:userId", protect, deletePlaylist)
router.put("/:playlistId/user/:userId/song/:songId", protect, addSongPlaylist)
router.delete("/deleteplaylist/:playlistId/song/:songId", protect, deleteSongPlaylist)
router.get("/:playlistId", protect, viewSongPlaylist)
router.get("/user/:userId", protect, viewPlaylist)


module.exports = router
