import * as fs from "fs";
import * as jsonio from "./utils/jsonio";

const dataJson = 'data.json';

const readData = () => jsonio.read(dataJson);

const readValues = (key: string) => readData()[key];

const readAllItems = () => readValues("items");

const readAllTags = () => readValues("tags");

const readApplicationPaths = () => readValues('applications');

const readTags = (dirPath: string) => readAllItems()[dirPath].tags;

const writeTags = (dirPath: string, tags: string[]) => {
    const data = readData();
    data["items"][dirPath].tags = tags;
    jsonio.write(dataJson, data);
};

const backupDataFile = () => fs.copyFile(dataJson, 'data.backup.json', () => console.log("data.json backed up."));

export {readAllItems, readAllTags, readApplicationPaths, readTags, writeTags, backupDataFile};
