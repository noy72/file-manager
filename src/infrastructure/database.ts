import * as fs from "fs";
import { read, write } from "./jsonio";
import { isImageFile, isVideoFile } from "../utils/file";
import Directory from "../models/Directory";
import { Data, Item } from "../models/Item";
import Images from "../models/Images";

const getLocations = (): string[] => read().locations;

const getItems = (): Item[] =>
    read().items.map(getSpecifiedObject).sort();

const getSpecifiedObject = (item: Item | string): Item => {
    const location = typeof item === "object" ? item.location : item;

    if (isImageFile(location)) {
        throw new Error("画像ファイルは未対応");
    } else if (isVideoFile(location)) {
        throw new Error("動画ファイルは未対応");
    }

    const files = fs.readdirSync(location);
    if (files.every((fileName: string) => isImageFile(fileName))) {
        return new Images(item);
    }
    return new Directory(item);
}

const getItem = (location: string): Item | undefined => getItems().find(item => item.location === location);

const getTags = (): { [index: string]: string[] } => read().tags;

const getCommands = (): { [index: string]: string[] } => read().commands;

const updateData = <K extends keyof Data>(key: K, value: any) => {
    let dataJson = read();
    dataJson[key] = value;
    write(dataJson);
};

const updateItems = (items: Item[]): void => {
    updateData("items", items);
}

const updateTags = (tags: { [index: string]: string[] }): void => {
    updateData("tags", tags);
}


const deleteItem = (location: string) => {
    const items = getItems();
    const index = items.findIndex(item => item.location == location);
    items.splice(index, 1);
    updateData("items", items);
};

const backupDataFile = (): void => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

export {
    getSpecifiedObject,
    getItems,
    getItem,
    getTags,
    getCommands,
    getLocations,
    updateItems,
    updateTags,
    deleteItem,
    backupDataFile
};
