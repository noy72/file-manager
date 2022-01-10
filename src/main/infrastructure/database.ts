import * as fs from "fs";
import { read, write } from "./jsonio";
import { Data, Item } from "../models/Item";

const getLocations = (): string[] => read().locations;

const getItems = (): Item[] => read().items.sort();

const getTags = (): { [index: string]: string[] } => read().tags;

const getCommands = (): { [index: string]: string[] } => read().commands;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateData = <K extends keyof Data>(key: K, value: any) => {
    const dataJson = read();
    dataJson[key] = value;
    write(dataJson);
};

const updateItems = (items: Item[]): void => {
    updateData("items", items);
};

const updateTags = (tags: { [index: string]: string[] }): void => {
    updateData("tags", tags);
};

const backupDataFile = (): void => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

export {
    getItems,
    getTags,
    getCommands,
    getLocations,
    updateItems,
    updateTags,
    backupDataFile
};
