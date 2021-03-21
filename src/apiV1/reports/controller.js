const moment = require('moment');
const mongoose = require('mongoose');

const Audience = require('../audience/model');

const controller = 'reports';

exports.classReport = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | classReport | query => ${JSON.stringify(
      req.query
    )}`
  );
  try {
    const classeReports = await Audience.find(
      { classId: req.query.classId },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    )
      .populate('classId', 'startTime endTime')
      .populate('studentId', 'role');
    if (classeReports.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Reports not found.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Report fetched successfully!',
        data: [classeReports],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | classReport | error => ${error.toString()}`
    );
    next(error);
  }
};
