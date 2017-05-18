/**
 * Main application server config
 */

import morgan from 'morgan';
import errorhandler from 'errorhandler';
import Tilesplash from 'tilesplash';
import config from './config';

// lets ensure nodeEnv is set
const nodeEnv = (process.env.nodeEnv = process.env.nodeEnv || 'development');

if (nodeEnv === 'development' || nodeEnv === 'test') {
  require('babel-register');
}

const app = new Tilesplash('postgres://brasko@localhost/hackaton');

// render('SELECT ST_AsGeoJSON(the_geom) as the_geom_geojson FROM layer WHERE ST_Intersects(the_geom, !bbox_4326!)');
app.layer('rivers', (tile, render) => {
  render('SELECT ST_AsGeoJSON(geom) FROM rivers;');
});

const env = app.server.get('env');
// env specific config
if (env === 'development' || env === 'test') {
  // use dev error handler
  app.server.use(errorhandler());

  // dev logging to the console
  app.server.use(morgan('dev'));
}

// start the server
app.shy = app.server.listen(config.port, config.ip, () => {
  /* eslint-disable no-console */
  console.log(`Express listenisang on port ${config.port}, env = ${env}`);
  app.server.emit('app_start');
});

export default app;
