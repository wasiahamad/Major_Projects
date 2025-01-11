// Import mongoose library for MongoDB interaction
const mongoose = require("mongoose");
// Import initial data to be inserted into the database
const initData = require("./data.js");
// Import the Listing model
const Listing = require("../models/listings.js");

// Connect to the database and log the result
main()
.then((res) => {
    console.log("database is connected")
})
.catch(err => console.log(err));

// Define an async function to connect to MongoDB
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

// Define an async function to initialize the database with data
const initDB = async () => {
    // Delete all existing documents in the Listing collection
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '677e2a3f0f9edf826678546b', 
    }));

    // Insert initial data into the Listing collection
    await Listing.insertMany(initData.data);
    // Log that the data was initialized
    console.log("data was initialized");
}

// Call the initDB function to initialize the database
initDB();


