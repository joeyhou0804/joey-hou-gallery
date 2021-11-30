const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const handbooks = require('../controllers/handbooks');

//===========================================

router.route('/')
    .get(catchAsync(handbooks.index));

module.exports = router;