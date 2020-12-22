const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path');
const file = require(`${rootPath}/src/utils/file`);

exports.ItemInfo = class ItemInfo {
    constructor(itemPath) {
        this.tags = [];
        this.type = this.getTypes(itemPath);
        this.thumbnail = this.getImageFileWithFirstNameWhenSorted(itemPath);
    }

    getImageFileWithFirstNameWhenSorted = (itemPath) =>
        fs.readdirSync(itemPath)
            .filter(fileName => file.isImageFile(fileName))
            .flatMap(dir => path.join(itemPath, dir))
            .sort()[0];

    getTypes(itemPath) {
        const files = fs.readdirSync(itemPath);
        if (files.every(fileName => file.isImageFile(fileName))) {
            return exports.itemTypes.IMAGES;
        }
        return exports.itemTypes.DIR;
    }
};

exports.itemTypes = {
    DIR: 0,
    IMAGES: 1,
};
