const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path');
const {ItemInfo} = require(`${rootPath}/src/model`);

exports.getLocatedAllItemPaths = (locations) => locations
    .flatMap(location => fs.readdirSync(location).flatMap(dir => path.join(location, dir)));

exports.findNewItemPaths = (data) => exports.getLocatedAllItemPaths(data["locations"])
    .filter(itemPath => !data['items'].hasOwnProperty(itemPath));

exports.syncDataFileWithItems = (data) => {
    exports.findNewItemPaths(data).forEach(itemPath => data["items"][itemPath] = new ItemInfo(itemPath));
    return data;
};

