const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRoutes = require("./routes/captain.routes")


// DB CONNETION
const connectToDB = require("./db/db");
connectToDB();

// use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(cookieParser());

// route 
app.get("/", (req, res) => {
    res.send("hello");  
});

// 
app.use("/users", userRoutes); 


app.use("/captains", captainRoutes);  


module.exports = app;






// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiZDYzZGQwMDNlMGM4ODVjOGZhOTEiLCJpYXQiOjE3MzcyMTc1OTcsImV4cCI6MTczNzMwMzk5N30.I9WL_jwF5FDl2lvctdpOdTrPh_dLR-RdBKqsS4vkI5k","captain":{"fullname":{"firstname":"test_captain","lastname":"test_last"},"email":"test_email@gmail.com","password":"$2b$10$dW2oXQviEWlRnHZBHoiI1.fcPBxb4UP5yssFsla0uDMv9QlaAOfzO","status":"inactive","vehicle":{"color":"red","plate":"MP 04 XY 2136","capacity":3,"vehicleType":"car"},"_id":"678bd63dd003e0c885c8fa91","__v":0}}