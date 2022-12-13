const {isNil} = require('ramda');

const yup = require('yup');
const {min} = require('./constants');

/*E-MAIL REQUIRED TO SING UP OR SEND NOTIFICATIONS */

const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

/*username for the app */

const username = yup
  .string()
  .trim();

/*password for the app */


const password = yup
  .string()
  .trim()
  .min(min);


const request = yup.object().shape({username: username.required()});

/*authenticate the user  to  the app */

const authenticate = yup.object().shape({
  username: username.required(),
  password: password.required()
});

/*for the register users who use  the app */

const register = yup.object().shape({
  email: email.required(),
  password: password.required(),
  username: username.required()
});

/*everytime users change something or request for something app has to update for example to change their passwords etc.. */


const update = yup.object().shape({
  username,
  password
}).test({
  message: 'Missing parameters',
  test: ({username: u, password: p}) => !(isNil(u) && isNil(p))
});

const change = yup.object().shape({password: password.required()});

module.exports = {
  authenticate, register, request, change, update
};
