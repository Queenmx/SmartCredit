var path = require('path');
var ROOT_PATH = path.resolve(__dirname, '../');
var WWW_URL = 'http://xingrongjinfu.iask.in:8886';
var WWW_URL = '';
//var DEV_WWW_URL = 'http://localhost:8009/';
var DEV_WWW_URL = '';

module.exports = {
    WWW_URL: WWW_URL,
    DEV_WWW_URL: DEV_WWW_URL,
    ROOT_PATH: ROOT_PATH,
    SRC_PATH: path.resolve(ROOT_PATH, 'src'),
    DIST_PATH: path.resolve(ROOT_PATH, 'dist')
};
