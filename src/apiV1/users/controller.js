const moment = require('moment');

const User = require('./model');
const { generateToken } = require('../auth/controller');

const controller = 'users';

exports.signup = async (req, res, next) => {
  console.log(
    `${moment()} | ${controller} | signup | body => ${JSON.stringify(req.body)}`
  );
  try {
    const body = req.body;
    const userData = new User(body);
    const insertedUser = await userData.save();
    const user = await User.findOne(
      { email: insertedUser.email },
      { password: 0 }
    );
    const token = await generateToken(
      { role: user.role, userId: user._id.toString() },
      req.reqId
    );
    res.status(201).send({
      status: true,
      success: {
        message: 'Registered successfully!',
        data: [user],
        token: token,
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | signup | error => ${error.toString()}`
    );
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(
      `${moment()} | ${controller} | login | body => ${JSON.stringify(
        req.body
      )}`
    );
    const body = req.body;
    const userData = await User.findOne({ email: body.email }, { password: 0 });
    if (!userData) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Please register first!',
        },
      });
    } else {
      const password = (
        await User.findOne({ email: body.email }, { password: 1 })
      ).password;
      if (body.password === password) {
        const token = {
          token: await generateToken(
            { role: userData.role, userId: userData._id.toString() },
            req.reqId
          ),
        };
        res.status(200).send({
          status: true,
          success: {
            message: 'Successfully logined!',
            data: [token],
          },
          error: null,
        });
      } else {
        res.status(401).send({
          status: false,
          success: null,
          error: {
            message: 'Unauthorized!',
          },
        });
      }
    }
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | login | error => ${error.toString()}`
    );
    next(error);
  }
};
