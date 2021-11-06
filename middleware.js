const {stationSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Station = require('./models/station');

module.exports.validateStation = (req, res, next) => {
    const {error} = stationSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        //req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const station = await Station.findById(id);
    if (String(station.author) !== String(req.user._id)){
        req.flash('error', 'You do not have permission!')
        return res.redirect(`/stations/${id}`);
    }
    next();
}