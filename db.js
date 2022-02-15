const mongoose = require('mongoose');
require('dotenv').config()
const mongooseURI = process.env.MONGOOSEURI;

const mongooseConnect = async () => {
    await mongoose.connect(mongooseURI, () => {
        console.log('Connected to Mongoose')
    })
}

module.exports = mongooseConnect;