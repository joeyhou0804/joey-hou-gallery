const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const posters = require('../controllers/posters');

//===========================================

router.route('/')
    .get(catchAsync(posters.index));

module.exports = router;