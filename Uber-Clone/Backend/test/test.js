const mongoose = require('mongoose');
const Captain = require('../models/captain.model'); // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/uber-clone', { useNewUrlParser: true, useUnifiedTopology: true });

const testCaptain = new Captain({
    fullname: { firstname: 'Test', lastname: 'Captain' },
    email: 'test@captain.com',
    password: 'password',
    status: 'active',
    vehicle: { color: 'black', plate: 'TEST123', capacity: 4, vehicleType: 'car' },
    socketId: 'testSocketId',
    location: { type: 'Point', coordinates: [75.8596612, 26.8085768] }
});

testCaptain.save().then(async () => {
    console.log('Test captain saved.');

    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [[75.8596612, 26.8085768], 100 / 6371]
            }
        }
    });

    console.log('Found captains:', captains);

    mongoose.connection.close();
}).catch(err => {
    console.error('Error saving test captain:', err);
    mongoose.connection.close();
});