/**
 * Main application server config
 */

import morgan from 'morgan';
import errorhandler from 'errorhandler';
import Tilesplash from 'tilesplash';
import config from './config';

// lets ensure nodeEnv is set
const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development' || nodeEnv === 'test') {
  require('babel-register');
}

if (!config.DB.USER) {
  console.log(
    `*************Missing configuration file! Please fill in server/config/${nodeEnv}.env.js file.**************`,
  );
}

const db = {
  user: config.DB.USER,
  database: config.DB.NAME,
  password: config.DB.PASS,
  port: config.DB.PORT,
  host: config.DB.HOST,
};

const app = new Tilesplash(db);

const CORS = function (req, res, tile, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  );
  next();
};

app.layer('rivers', CORS, { simplify_distance: 20 }, (tile, render) => {
  console.log(tile);
  render({
    becej_parcels: [
      'SELECT id, !x! as x, !y! as y, !z! as z,  ST_AsGeoJSON(geom) as the_geom_geojson FROM becej_4326 WHERE ST_Intersects(geom, !bbox_4326!)',
    ],
    // becej_lpis: 'SELECT id,  ST_AsGeoJSON(geom) as the_geom_geojson FROM becej_4326 WHERE ST_Intersects(geom, !bbox_4326!)',
    // becej_parcel: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM becej_lpis WHERE ST_Intersects(geom, !bbox_4326!)',
    // rivers: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM rivers WHERE ST_Intersects(geom, !bbox_4326!)',
    // lakes: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM lakes WHERE ST_Intersects(geom, !bbox_4326!)',
    // islands: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM islands WHERE ST_Intersects(geom, !bbox_4326!)',
    // countries: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM countries WHERE ST_Intersects(geom, !bbox_4326!)',
    // regions: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM regions WHERE ST_Intersects(geom, !bbox_4326!)',
    // urban_areas: 'SELECT id, ST_AsGeoJSON(geom) as the_geom_geojson FROM urban_areas WHERE ST_Intersects(geom, !bbox_4326!)',
  });
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
