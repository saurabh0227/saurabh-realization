const express = require('express');
const router = express.Router();

const { verifyToken } = require('../auth/controller');
const {
  create,
  fetchClasses,
  fetchClassByTeacher,
  startClass,
  endClass,
} = require('./controller');

router.post('/create', verifyToken, create);

router.get('/fetchClasses', verifyToken, fetchClasses);

router.get('/fetchClassByTeacher', verifyToken, fetchClassByTeacher);

router.put('/startClass/:classId', verifyToken, startClass);

router.put('/endClass/:classId', verifyToken, endClass);

module.exports = router;
