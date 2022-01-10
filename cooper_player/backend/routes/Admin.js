const express = require("express")
const {addSong, deleteSong,addPlan, removePlan, displayQueries} = require('../controllers/Admin')
const {songValidation} = require("../validators/index")
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const router = express.Router()

router.post("/addsong",upload.single("song"),songValidation,addSong)
router.delete("/deletesong/:songId", deleteSong)
router.put("/addplan/:userId", addPlan)
router.put("/removeplan/:userId", removePlan)
router.get("/queries", displayQueries)

module.exports = router