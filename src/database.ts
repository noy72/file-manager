import * as fs from "fs";
import { basename } from "path";
import { read, write } from "./utils/jsonio";
import { isImageFile, isVideoFile } from "./utils/file";
import Directory from "./models/Directory";
import { Data, Item } from "./models/Item";

const getLocations = (): string[] => read().locations;

const getItems = (): Item[] =>
    read().items.map((item: Item): Item => {
        const location = basename(item.location);
        if (isImageFile(location)) {
            throw new Error("画像ファイルは未対応");
        } else if (isVideoFile(location)) {
            throw new Error("動画ファイルは未対応");
        }
        return new Directory(item);
    }).sort();

const getItem = (location: string): Item | undefined => getItems().find(item => item.location === location);

const getTags = (): { [index: string]: string[] } => read().tags;

const getCommands = (): { [index: string]: string[] } => read().commands;

const updateData = <K extends keyof Data>(key: K, value: any) => {
    let dataJson = read();
    dataJson[key] = value;
    write(dataJson);
};

const updateItemList = (items: Item[]): void => {
    updateData("items", items);
}

const updateTagList = (group: string, tag: string): void => {
    const tags = getTags();
    if (!Object.keys(tags).includes(group)) {
        tags[group] = [];
    }
    if (tags[group].includes(tag)) return;
    tags[group].push(tag);
    updateData("tags", tags);
};

const updateAttachedTags = (location: string, tags: string[]): void => {
    const items = getItems();
    const index = items.findIndex(item => item.location === location);
    items[index].tags = tags;
    updateData("items", items);
};

const deleteItem = (location: string) => {
    const items = getItems();
    const index = items.findIndex(item => item.location == location);
    items.splice(index, 1);
    updateData("items", items);
};

const backupDataFile = (): void => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

export {
    getItems,
    getItem,
    getTags,
    getCommands,
    getLocations,
    updateItemList,
    updateTagList,
    updateAttachedTags,
    deleteItem,
    backupDataFile
};
