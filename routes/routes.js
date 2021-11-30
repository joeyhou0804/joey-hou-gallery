const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const videos = require('../controllers/videos');

//===========================================

router.route('/')
    .get(catchAsync(videos.index));

module.exports = router;