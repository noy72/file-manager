const fs = require('fs');
const path = require('path');

const jsonio = require('./utils/jsonio');
const {ItemInfo} = require('./model');
const {readAllItems} = require('./database');

const getLocatedAllItemPaths = (locations) => locations
    .flatMap(location => fs.readdirSync(location).flatMap(dir => path.join(location, dir)));

exports.syncDataFileWithItems = (data) => {
    getLocatedAllItemPaths(data["locations"])
        .filter(itemPath => fs.statSync(itemPath).isDirectory())
        .filter(itemPath => !data["items"].hasOwnProperty(itemPath))
        .forEach(itemPath => data["items"][itemPath] = new ItemInfo(itemPath));
    return data;
};

exports.searchItems = (query) => searchItemsWithANDQuery(readAllItems(), ...query.split(' '));

const searchItemsWithANDQuery = function (items, word, ...words) {
    let result = null;
    if (isTag(word)) {
        //TODO: add searchItemsByTag() here
    } else {
        result = searchItemsByTitle(items, word);
    }

    if (words.length === 0) return result;
    return searchItemsWithANDQuery(result, ...words);
};


const isTag = (str) => str[0] === '#';

const searchItemsByTitle = (items, title) => {
    let result = {};
    for (const [key, value] of Object.entries(items)) {
        if (path.basename(key).includes(title)) {
            result[key] = value;
        }
    }
    return result;
};

exports.syncDataFile = () => jsonio.write('data.json', syncDataFileWithItems(jsonio.read('data.json')));
