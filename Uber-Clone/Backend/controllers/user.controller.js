const userModel = require("../models/user.model")
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");
// const blackListTokenModel = require('../models/blackListToken.model');

// middleware (register controller)
module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    const {fullName, email, password} = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName, 
        lastName: fullName.lastName,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
}
  
// (login controller)
module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select("+password");

    if(!user) {
        return res.status(401).json({message: "Invalid email or password"});
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({token, user});
}

// (user profile controller)
module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);
    res.send("User profile retrieved successfully");
}









