const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB conncetion successful"))
    .catch( (error) => {
        console.log("DB Connection Issue");
        console.error(error); 
        process.exit(1);
    })
}