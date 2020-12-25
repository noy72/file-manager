const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path');
const {ItemInfo} = require(`${rootPath}/src/model`);
const jsonio = require(`${rootPath}/src/utils/jsonio`);

exports.getLocatedAllItemPaths = (locations) => locations
    .flatMap(location => fs.readdirSync(location).flatMap(dir => path.join(location, dir)));

exports.findNewItemPaths = (data) => exports.getLocatedAllItemPaths(data["locations"])
    .filter(itemPath => !data['items'].hasOwnProperty(itemPath));

exports.syncDataFileWithItems = (data) => {
    exports.findNewItemPaths(data).forEach(itemPath => data["items"][itemPath] = new ItemInfo(itemPath));
    return data;
};

exports.searchItems = (query) => exports.__searchItems(exports.getAllItems(), '', query.split(' '));

exports.getAllItems = () => jsonio.read('data.json')["items"];

exports.__searchItems = function (items, word, words) {
    let result = null;
    if (isTag(word)) {
        //TODO: add searchItemsByTag() here
    } else {
        result = exports.searchItemsByTitle(items, word);
    }

    if (words.length === 0) return result;
    return exports.__searchItems(result, words[0], words.slice(1, words.length));
};


const isTag = (str) => str[0] === '#';

exports.searchItemsByTitle = (items, title) => {
    let result = {};
    for (const [key, value] of Object.entries(items)) {
        if (path.basename(key).includes(title)) {
            result[key] = value;
        }
    }
    return result;
};

