const express = require('express');

const audiences = require('./audience/route');
const classes = require('./classes/route');
const reports = require('./reports/route');
const users = require('./users/route');

const router = express.Router();

router.use('/audiences', audiences);
router.use('/classes', classes);
router.use('/reports', reports);
router.use('/users', users);

module.exports = router;
