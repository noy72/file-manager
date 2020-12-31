const jsonio = require('./utils/jsonio');

const dataJson = 'data.json';

const readData = () => jsonio.read(dataJson);

const readValues = (key) => readData()[key];

exports.readAllItems = () => readValues("items");

exports.readAllTags = () => readValues("tags");

exports.readApplicationPaths = () => readValues('applications');

exports.readTags = (dirPath) => exports.readAllItems()[dirPath].tags;

exports.writeTags = (dirPath, tags) => {
    const data = readData();
    data["items"][dirPath].tags = tags;
    jsonio.write(dataJson, data);
};
