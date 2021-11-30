const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const arts = require('../controllers/arts');

//===========================================

router.route('/')
    .get(catchAsync(arts.index));

module.exports = router;