import * as fs from 'fs';
import * as path from 'path';
import * as file from './utils/file';

const ItemInfo = class ItemInfo {
    tags: string[] = [];
    type: number;
    thumbnail: string;

    constructor(itemPath: string) {
        this.type = this.getTypes(itemPath);
        this.thumbnail = this.getImageFileWithFirstNameWhenSorted(itemPath);
    }

    getImageFileWithFirstNameWhenSorted = (itemPath: string) =>
        fs.readdirSync(itemPath)
            .filter((fileName: string) => file.isImageFile(fileName))
            .flatMap((dir: string) => path.join(itemPath, dir))
            .sort()[0];

    getTypes(itemPath: string) {
        const files = fs.readdirSync(itemPath);
        if (files.every((fileName: string) => file.isImageFile(fileName))) {
            return exports.itemTypes.IMAGES;
        }
        return exports.itemTypes.DIR;
    }
};

const itemTypes = {
    DIR: 0,
    IMAGES: 1,
};

export {itemTypes, ItemInfo};
