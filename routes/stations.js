const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const multer = require('multer');
const upload = multer({storage});

//===========================================

router.route('/');

module.exports = router;