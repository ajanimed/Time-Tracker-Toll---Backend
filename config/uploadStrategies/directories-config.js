let config = require('config');
const fs = require('fs-extra');

exports.createTaskScreenshotsUploadingDirectory = function (task) {
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();
    let dir = config.get('uploadDestination') + '/' + currentYear + '/' + currentMonth + '/' + currentDay + '/'+task;
    fs.ensureDirSync(dir);
    return dir;
    next();
};

