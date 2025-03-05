const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/blackListToken.model");
const { validationResult } = require("express-validator");
const sendEmail = require("../utils/sendEmail");
const rideModel = require("../models/ride.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle, location } = req.body;

  // Validate the location field
  if (
    !location ||
    !location.type ||
    !location.coordinates ||
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2
  ) {
    return res.status(400).json({
      message:
        "Invalid location format. Expected { type: 'Point', coordinates: [longitude, latitude] }",
    });
  }

  const [longitude, latitude] = location.coordinates;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
    location: {
      type: location.type, // Ensure type is included
      coordinates: [longitude, latitude], // Ensure coordinates are included
    },
  });

  const token = captain.generateAuthToken();

  // Send registration confirmation email to captain
  try {
    await sendEmail(
      captain.email, // Captain's email
      "Welcome to Our Platform – Registration Successful!", // Email subject
      `Dear ${captain.firstname} ${captain.lastname},
    
    We are thrilled to welcome you to our platform! Your registration as a captain has been successfully completed. Here are your registration details:
    
    - **Name:** ${captain.firstname} ${captain.lastname}
    - **Email:** ${captain.email}
    - **Vehicle Type:** ${captain.vehicleType}
    - **Vehicle Color:** ${captain.color}
    - **License Plate:** ${captain.plate}
    - **Location:** ${captain.location.coordinates[1]}, ${captain.location.coordinates[0]}
    
    As a registered captain, you now have access to our platform's features, including managing rides, tracking your location, and connecting with passengers. We are committed to providing you with a seamless and efficient experience.
    
    **Next Steps:**
    1. Log in to your account using your registered email and password.
    2. Update your profile with any additional details.
    3. Start accepting ride requests and earning with us!
    
    If you have any questions or need assistance, feel free to reach out to our support team at support@yourplatform.com or call us at +123-456-7890.
    
    Thank you for joining our platform. We look forward to working with you!
    
    Best regards,
    The [NextRide] Team`
    );
    console.log("Registration confirmation email sent to:", captain.email);
  } catch (error) {
    console.error("Error sending registration confirmation email:", error);
  }

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

module.exports.completeRide = async (req, res) => {
  const { rideId } = req.body; // Get ride ID from request body

  try {
    // Find the ride and mark it as completed
    const ride = await rideModel.findById(rideId).populate("user captain");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    ride.status = "completed";
    await ride.save();

    // Send ride completion email to user
    await sendEmail(
      ride.user.email, // User's email
      "Your Ride Has Been Completed – Thank You for Choosing Us!", // Email subject
      `Dear ${ride.user.fullname.firstname},

We are pleased to inform you that your ride has been successfully completed. Here are the details of your trip:

- **Ride ID:** ${ride._id}
- **Pickup Location:** ${ride.pickup}
- **Drop-off Location:** ${ride.destination}
- **Total Fare:** ${ride.fare}
- **Captain:** ${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}
- **Vehicle:** ${ride.captain.vehicle.vehicleType} (${ride.captain.vehicle.color}, ${ride.captain.vehicle.plate})

Thank you for choosing our platform for your ride. We hope you had a pleasant experience. If you have any feedback or concerns, please feel free to reach out to us at support@yourplatform.com or call us at +123-456-7890.

We look forward to serving you again soon!

Best regards,
The [Your Platform Name] Team`
    );

    res.status(200).json({ message: "Ride completed successfully", ride });
  } catch (error) {
    console.error("Error completing ride:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Logout successfully" });
};
