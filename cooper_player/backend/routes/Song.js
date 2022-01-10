const express = require("express")
const {Allsongs} = require("../controllers/Song")
const router = express.Router()

router.get("/", Allsongs)

module.exports = router