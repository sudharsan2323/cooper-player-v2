const express = require("express")

const {createUser, signin, allUser, singleUser, userQueries} = require("../controllers/User")
const {createUserValidator, queriesValidation} = require("../validators/index")

const router = express.Router()

router.post("/new/signup", createUserValidator, createUser)
router.post("/signin", signin)
router.get("/", allUser)
router.get("/:userId", singleUser)
router.post("/queries", queriesValidation,userQueries)


module.exports = router