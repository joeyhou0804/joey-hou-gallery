const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Station = require('../models/station');

const multer = require('multer');
const stations = require('../controllers/stations');


//===========================================

router.route('/')
    .get(catchAsync(stations.index))

router.get('/new', stations.renderNewForm);

router.route('/:id')
    .get(catchAsync(stations.showStation))
    .delete(catchAsync(stations.deleteStation));

router.get('/:id/edit', catchAsync(stations.renderEditForm))

module.exports = router;