const fs = require('fs');

exports.read = function (path) {
    return JSON.parse(fs.readFileSync(path).toString());
};

exports.write = function (path, json) {
    fs.writeFileSync(path, JSON.stringify(json))
};
