const moment = require('moment');
const mongoose = require('mongoose');

const Class = require('./model');
const { sendSocketMsg } = require('./../../config/socket');

const controller = 'classes';

exports.create = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | create | body => ${JSON.stringify(req.body)}`
  );
  try {
    if (req.role !== 'teacher') {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: `You're not allowed to create class.`,
        },
      });
      return;
    }
    const body = req.body;
    body.teacherId = req.userId;
    const classData = await Class.create(body);
    if (classData.errors) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in creating class.',
        },
      });
      return;
    }
    res.status(201).send({
      status: true,
      success: {
        message: 'class added successfully!',
        data: [classData],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | create | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.fetchClasses = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | fetchClasses | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    // const page = parseInt(req.query.page);
    // const skip = (page - 1) * limit;
    const classes = await Class.find({ active: true, endTime: null });
    // .sort({ createdAt: -1 })
    // .skip(skip)
    // .limit(limit);
    if (classes.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Class not found.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Classes fetched successfully!',
        data: [classes],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | fetchClasses | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.fetchClassByTeacher = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | fetchClassByTeacher | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    // const page = parseInt(req.query.page);
    // const skip = (page - 1) * limit;
    const classes = await Class.find({
      active: true,
      teacherId: req.query.teacherId,
      endTime: null,
    });
    // .sort({ createdAt: -1 })
    // .skip(skip)
    // .limit(limit);
    if (classes.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Class not found.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Classes fetched successfully!',
        data: [classes],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | fetchClassByTeacher | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.startClass = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | startClass | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    const body = req.body;
    body.startTime = new Date();
    if (req.role !== 'teacher') {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: `You're not allowed to start class.`,
        },
      });
      return;
    }
    const classData = await Class.findOneAndUpdate(
      { _id: req.params.classId, active: true, endTime: null },
      body,
      {
        new: true,
      }
    );
    if (!classData) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in starting class.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Class started successfully!',
        data: [classData],
      },
      error: null,
    });
    sendSocketMsg('classStarted', classData);
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | startClass | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.endClass = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | endClass | body => ${JSON.stringify(
      req.body
    )}`
  );
  try {
    const body = req.body;
    body.endTime = new Date();
    body.active = false;
    if (req.role !== 'teacher') {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: `You're not allowed to end class.`,
        },
      });
      return;
    }
    const classData = await Class.findOneAndUpdate(
      { _id: req.params.classId, active: true, endTime: null },
      body,
      {
        new: true,
      }
    );
    if (!classData) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in ending class.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Class ended successfully!',
        data: [classData],
      },
      error: null,
    });
    sendSocketMsg('classEnded', classData);
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | endClass | error => ${error.toString()}`
    );
    next(error);
  }
};
