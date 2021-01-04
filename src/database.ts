import * as fs from "fs";
import {basename} from "path";
import {read, write} from "./utils/jsonio";
import deserialize from "./utils/deserialize";
import {isImageFile, isVideoFile} from "./utils/file";
import Item from "./models/Item";
import Directory from "./models/Directory";

const dataJson = 'data.json';
const keys = {
    locations: "locations",
    items: "items",
    tags: "tags",
    applications: "applications"
} as const;

const readDataJson = (): any => read(dataJson);

const getValues = (key: string): any => readDataJson()[key];

const getLocationList = (): string[] => getValues(keys.locations);

const getItemList = (): Item[] =>
    getValues(keys.items).map((obj: any): Item[] => {
        const location = basename(obj["location"]);
        if (isImageFile(location)) {
            throw new Error("画像ファイルは未対応");
        } else if (isVideoFile(location)) {
            throw new Error("動画ファイルは未対応");
        }
        return deserialize(obj, new Directory());
    }).sort();

const getItem = (location: string): Item | undefined => getItemList().find(item => item.location === location);

const getTagList = (): string[] => getValues(keys.tags);

const getApplicationList = (): [[string, string[]]] => getValues(keys.applications);

function updateValue(key: string, obj: any): any {
    let dataJson = readDataJson();
    dataJson[key] = obj;
    return dataJson;
}

const updateItemList = (itemList: Item[]): void => write(updateValue(keys.items, itemList));

const updateAttachedTags = (location: string, tags: string[]): void => {
    let dataJson = readDataJson();
    //TODO: リファクタリングする
    for (let idx = 0; idx < dataJson[keys.items].length; idx++) {
        if (dataJson[keys.items][idx].location === location) {
            dataJson[keys.items][idx].tags = tags;
        }
    }
    write(dataJson);
};

const backupDataFile = (): void => fs.copyFile(dataJson, 'data.backup.json', () => console.log("data.json backed up."));

export {
    getItemList,
    getItem,
    getTagList,
    getApplicationList,
    getLocationList,
    updateItemList,
    updateAttachedTags,
    backupDataFile
};
