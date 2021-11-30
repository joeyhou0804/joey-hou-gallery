const Station = require('../models/station');

module.exports.index = async (req, res) => {
    const stations = await Station.find({});
    res.render('stations/index', {stations})
}

module.exports.renderNewForm = (req, res) => {
    res.render('stations/new');
}

module.exports.createStation = async(req, res, next) => {
    const station = new Station(req.body.station);
    station.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    station.author = req.user._id;
    await station.save();
    console.log(station);
    req.flash('success', 'Successfully added a new station!');
    res.redirect(`/stations/${station._id}`)
}

module.exports.showStation = async(req, res) => {
    const station = await Station.findById(req.params.id).populate('author');
    if (!station){
        req.flash('error', 'Cannot find that station!');
        return res.redirect('/stations');
    }
    res.render('stations/show', {station});
}

module.exports.renderEditForm = async (req, res) => {

    const {id} = req.params;
    const station = await Station.findById(id);
    if (!station){
        req.flash('error', 'Cannot find that station!');
        return res.redirect('/stations');
    }
    res.render('stations/edit', {station});
}

module.exports.updateStation = async (req, res) => {
    
    const {id} = req.params;
    const station = await Station.findByIdAndUpdate(id, {...req.body.station});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    station.images.push(...imgs);
    await station.save();
    if (req.body.deleteImages) {
        await station.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(station)
    }
    req.flash('success', 'Successfully updated this station!');
    res.redirect(`/stations/${station._id}`)
}

module.exports.deleteStation = async (req, res) => {
    const {id} = req.params;
    await Station.findByIdAndDelete(id);
    res.redirect('/stations');
}