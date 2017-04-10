/**
 * Created by ondrejzvara on 26.9.16.
 */

var path = require('path');
var dirname = __dirname + './../';

var paths = {
    APP: path.join(dirname, 'client/app/', 'app.js'),
    VENDORS: path.join(dirname, 'client/app/', 'vendor.js'),
    POLYFILLS: path.join(dirname, 'client/app/', 'polyfills.js'),
    SASS: path.join(dirname, 'client/app/sass/', 'main.scss'),
    NODE_MODULES: path.join(dirname, 'node_modules/'),
    BUILD_CLIENT: path.join(dirname, 'build/client/'),
    TMP: path.join(dirname, '/.tmp/'),
    INDEX_HTML: path.join(dirname, 'client/app/', '_index.ejs'),
    FONTS: path.join(dirname, 'app/fonts/'),
};

module.exports = paths;