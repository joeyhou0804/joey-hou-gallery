const mongoose = require('mongoose');
const cities = require('../cities');
const Station = require('../models/station');

const MAX = 0;

mongoose.connect('mongodb://localhost:27017/joeyhouhomepage', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database Connected!");
});

// const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    //To delete everything:
    //
    // await Station.deleteMany({});

    for (let i = 0; i < MAX; i++) {
        const station = new Station({
            location: `${cities[i].city}, ${cities[i].state}`,
            date: `${date[i]}`
        })
        await station.save();
    }
}

seedDB();