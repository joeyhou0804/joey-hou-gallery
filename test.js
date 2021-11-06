const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/joeyhouhomepage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
        console.log("OH NO ERROR")
        console.log(err)
    })

