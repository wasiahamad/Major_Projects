// Import the mongoose module
const mongoose = require('mongoose');

// Function to connect to the database
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}

// Export the connectToDb function
module.exports = connectToDb;