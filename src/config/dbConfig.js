const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_ENV } = require('./serverConfig');

async function connectToDB() {

    try {
        console.log("Connecting to MongoDB")
        if(NODE_ENV === 'development') {
            await mongoose.connect(ATLAS_DB_URL);
            console.log("Connected to MongoDB successfully");
        }

    }
    catch (error) {
        console.error(`Error connecting to MongoDB`);
        console.error(error);
    }

}

module.exports = connectToDB;