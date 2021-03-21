import { readdirSync } from 'fs';
import { isDotFile, isImageFile, isVideoFile } from '../domain/service/file';
import * as db from '../infrastructure/database';
import { getRootLocations } from "../repositories/locationRepository";
import Directory from '../models/Directory';
import Images from '../models/Images';
import { Item } from '../models/Item';
import Video from '../models/Video';
import { join } from 'path';
import { exists } from '../infrastructure/file';

const getItems = () => db.getItems().map(classify);

const classify = (item: Item | string): Item => {
    const location = typeof item === "object" ? item.location : item;

    if (isImageFile(location)) {
        throw new Error("画像ファイルは未対応");
    } else if (isVideoFile(location)) {
        return new Video(item);
    }

    if (exists(location)) {
        const files = readdirSync(location);
        if (files.every((fileName: string) => isImageFile(fileName))) {
            return new Images(item);
        }
    }

    return new Directory(item);
}

const getNewItems = (): Item[] => {
    const savedItemPaths = getItems().map(item => item.location);
    return getLocatedItemPaths()
        .filter(path => !savedItemPaths.includes(path))
        .filter(path => !isDotFile(path))
        .map(classify);
}

const getLocatedItemPaths = (): string[] => getRootLocations().flatMap(
    location => readdirSync(location).flatMap((dir: string) => join(location, dir)));

const getItem = (location: string): Item | undefined => getItems().find(item => item.location === location);

const addItems = (items: Item[]): void => db.updateItems([...db.getItems(), ...items]);

const deleteItem = (location: string) => {
    const items = getItems();
    const index = items.findIndex(item => item.location == location);
    items.splice(index, 1);
    db.updateItems(items);
};

const updateAttachedTags = (location: string, tags: string[]): void => {
    const items = getItems();
    const index = items.findIndex(item => item.location === location);
    items[index].tags = tags;
    db.updateItems(items);
};


export {
    getItems,
    getNewItems,
    getItem,
    addItems,
    deleteItem,
    updateAttachedTags,
    classify
};