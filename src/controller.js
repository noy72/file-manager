const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path');
const {ItemInfo} = require(`${rootPath}/src/model`);
const jsonio = require(`${rootPath}/src/utils/jsonio`);

const getLocatedAllItemPaths = (locations) => locations
    .flatMap(location => fs.readdirSync(location).flatMap(dir => path.join(location, dir)));

exports.syncDataFileWithItems = (data) => {
    getLocatedAllItemPaths(data["locations"])
        .filter(itemPath => fs.statSync(itemPath).isDirectory())
        .filter(itemPath => !data["items"].hasOwnProperty(itemPath))
        .forEach(itemPath => data["items"][itemPath] = new ItemInfo(itemPath));
    return data;
};

exports.searchItems = (query) => searchItemsWithANDQuery(getAllItems(), '', query.split(' '));

const getAllItems = () => jsonio.read('data.json')["items"];

const searchItemsWithANDQuery = function (items, word, words) {
    let result = null;
    if (isTag(word)) {
        //TODO: add searchItemsByTag() here
    } else {
        result = searchItemsByTitle(items, word);
    }

    if (words.length === 0) return result;
    return searchItemsWithANDQuery(result, words[0], words.slice(1, words.length));
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

