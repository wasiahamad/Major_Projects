const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleweres/auth.middleware");



// routes (Register)
router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters or long"),
    body("password").isLength({  min: 6 }).withMessage("password must be at least 6 character long"),
],
    userController.registerUser
);

// login route 
router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password must be at least 6 character long")
],
    userController.loginUser
);

// Profile route 
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);



module.exports = router; 