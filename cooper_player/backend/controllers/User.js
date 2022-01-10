const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const Queries = require("../models/Queries");
require("dotenv").config()

exports.createUser = async (req, res, next) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).json({ message: "email is taken" })
        }
        const newUser = await new User(req.body)
        await newUser.save()
        return res.json({ message: "user created" })
    } catch (error) {
        return next(new ErrorResponse("something went wrong", 500))
    }

}


exports.signin =  (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                err: "email and password do not match"
            })
        }
        if(!user){
            return next(new ErrorResponse("no user found", 404))
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "email and password do not match"
            })
        }


        sendToken(user, 200, res)

    })
}




exports.allUser = async (req, res, next) => {
    const users = await User.find({}).select("-password")
    if (!users) {
        return res.status(400).json({ message: "no user found" })
    }
    return res.status(200).json({ users })
}

exports.singleUser = async(req, res, next) => {
    const user = await User.findById(req.params.userId).select("-password")
    if(!user){
        return res.status(400).json({message: "no user found"})
    }
    return res.status(200).json({user})
}

exports.userQueries = async(req, res, next) => {
    const queries = await new Queries({content: req.body.content, user: req.body.userId})
    const user = await User.findById(req.body.userId)
    if(!user){
        return res.status(404).json({error: "user not found"})
    }
    if(!user.status){
        return res.status(400).json({message: "you should be a pro user"})
    }
    
    const userQueries = user.queries
    userQueries.push(queries._id)
    user.queries = userQueries

    await user.save()
    await queries.save()
    return res.status(200).json({message: "queries is successfully added"})
}



const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    user.password = undefined
    return res.status(statusCode).json({ sucess: true, token, user });
};
