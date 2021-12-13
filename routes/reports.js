const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const reports = require('../controllers/reports');

//===========================================

router.route('/')
    .get(catchAsync(reports.index));

module.exports = router;