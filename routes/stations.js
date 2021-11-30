const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const stations = require('../controllers/stations');

//===========================================

router.route('/')
    .get(catchAsync(stations.index));

module.exports = router;