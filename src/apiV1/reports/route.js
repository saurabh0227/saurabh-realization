const express = require('express');
const router = express.Router();

const { verifyToken } = require('../auth/controller');
const { classReport } = require('./controller');

router.get('/classReport', classReport);

module.exports = router;
