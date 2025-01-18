// getting-started.js
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT,)
    .then(() => {
        console.log("Connected to DB");
    }).catch ((err) => {
        console.log("db error", err);
    });
}

module.exports = connectToDB;

// main().then((res) => {
//     console.log("Connected to db");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


