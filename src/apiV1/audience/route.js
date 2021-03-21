const express = require('express');
const router = express.Router();

const { verifyToken } = require('../auth/controller');
const { joinClass, leaveClass } = require('./controller');

router.post('/joinClass', verifyToken, joinClass);

router.put('/leaveClass', verifyToken, leaveClass);

module.exports = router;
