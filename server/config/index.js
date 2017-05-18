import _ from 'lodash';
import path from 'path';

const config = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../..`),

  // Server port
  port: process.env.PORT || 3001,

  // Server IP
  ip: process.env.IP || 'localhost',

  // logging direcotry for production logs
  logDir: path.join(`${__dirname}/../../log`),
};

export default _.extend(
  config,
  require(`./${process.env.NODE_ENV}.env.js`) || {},
);
