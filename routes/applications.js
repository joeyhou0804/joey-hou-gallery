const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const applications = require('../controllers/applications');

//===========================================

router.route('/')
    .get(catchAsync(applications.index));

module.exports = router;