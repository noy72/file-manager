const fs = require('fs');

exports.read = function (path: string) {
    return JSON.parse(fs.readFileSync(path).toString());
};

exports.write = function (path: string, json: object) {
    fs.writeFileSync(path, JSON.stringify(json))
};
