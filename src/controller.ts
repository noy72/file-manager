const fs = require('fs');
const path = require('path');

const jsonio = require('./utils/jsonio');
const {ItemInfo} = require('./model');
const {readAllItems} = require('./database');

const getLocatedAllItemPaths = (locations: string[]) => locations.flatMap(
    location => fs.readdirSync(location).flatMap((dir: string) => path.join(location, dir)));

exports.syncDataFileWithItems = (data: any) => {
    getLocatedAllItemPaths(data["locations"])
        .filter(itemPath => fs.statSync(itemPath).isDirectory())
        .filter(itemPath => !data["items"].hasOwnProperty(itemPath))
        .forEach(itemPath => data["items"][itemPath] = new ItemInfo(itemPath));
    return data;
};

// @ts-ignore
exports.searchItems = (query: string) => searchItemsWithANDQuery(readAllItems(), ...query.split(' '));

const searchItemsWithANDQuery = function (items: any, word: string, ...words: string[]): object {
    let result;
    if (isTag(word)) {
        result = searchItemsByTag(items, word.slice(1, word.length));
    } else {
        result = searchItemsByTitle(items, word);
    }

    if (words.length === 0) return result;
    // @ts-ignore
    return searchItemsWithANDQuery(result, ...words);
};


const isTag = (str: string) => str[0] === '#';

const searchItemsByTitle = (items: any, title: string) => {
    let result:any = {};
    for (const [key, value] of Object.entries(items)) {
        if (path.basename(key).includes(title)) {
            result[key] = value;
        }
    }
    return result;
};

const searchItemsByTag = (items: object, tag: string) => {
    let result: any = {};
    for (const [key, value] of Object.entries(items)) {
        if (value.tags.includes(tag)) {
            result[key] = value;
        }
    }
    return result;
};

exports.syncDataFile = () => jsonio.write('data.json', exports.syncDataFileWithItems(jsonio.read('data.json')));
