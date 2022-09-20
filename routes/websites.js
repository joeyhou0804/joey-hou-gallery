const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const websites = require('../controllers/websites');

//===========================================

router.route('/')
    .get(catchAsync(websites.index));

module.exports = router;