const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Station = require('../models/station');
const {isLoggedIn, isAuthor, validateStation} = require('../middleware');

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const stations = require('../controllers/stations');


//===========================================

router.route('/')
    .get(catchAsync(stations.index))
    .post(isLoggedIn, upload.fields([
        {name: 'image'},
        {name: 'map'}
    ]), validateStation, catchAsync(stations.createStation));

router.get('/new', isLoggedIn, stations.renderNewForm);

router.route('/:id')
    .get(catchAsync(stations.showStation))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateStation, catchAsync(stations.updateStation))
    .delete(isLoggedIn, catchAsync(stations.deleteStation));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(stations.renderEditForm))

module.exports = router;