const moment = require('moment');
const mongoose = require('mongoose');

const Audience = require('./model');
const Class = require('../classes/model');

const controller = 'audience';

exports.joinClass = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | joinClass | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    const body = req.body;
    if (req.role !== 'student') {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: `You're not an valid student to join this class.`,
        },
      });
      return;
    }
    if (body.classId) {
      const classData = await Class.findOne({ _id: body.classId });
      if (!classData.active || classData.startTime === null) {
        res.status(200).send({
          status: false,
          success: null,
          error: {
            message: `Please wait to start the class.`,
          },
        });
        return;
      }
    }
    body.studentId = req.userId;
    body.inTime = new Date();
    const audience = await Audience.create(body);
    if (audience.errors) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in joining class.',
        },
      });
      return;
    }
    res.status(201).send({
      status: true,
      success: {
        message: 'Joined successfully!',
        data: [audience],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | joinClass | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.leaveClass = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | leaveClass | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    if (req.role !== 'student') {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: `You're not an valid student to leave this class.`,
        },
      });
      return;
    }
    const body = req.body;
    body.outTime = new Date();
    body.active = false;
    const audience = await Audience.findOneAndUpdate(
      { classId: body.classId, studentId: req.userId },
      body,
      { new: true }
    );
    if (audience.errors) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in leaving class.',
        },
      });
      return;
    }
    res.status(201).send({
      status: true,
      success: {
        message: 'Leaved successfully!',
        data: [audience],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | leaveClass | error => ${error.toString()}`
    );
    next(error);
  }
};
