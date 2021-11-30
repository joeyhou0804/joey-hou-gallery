const Station = require('../models/station');

module.exports.index = async (req, res) => {
    const stations = await Station.find({});
    res.render('stations/index', {stations})
}

module.exports.renderNewForm = (req, res) => {
    res.render('stations/new');
}