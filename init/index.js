// this file is to initialise data for the app in database
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initdata = require('./data.js');
main().then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
async function insertData() {
    // await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data inserted");
}
insertData();