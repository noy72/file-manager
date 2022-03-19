import lodash from "lodash";
import { MemorySync, LowSync, JSONFileSync } from "lowdb";
import { accessSync, writeFileSync } from "fs";
import path from "path";
import { Commands, Data, Item, Locations, Tags } from "../../types";

const getDataFilePath = () => {
    const pathString = getPathString();
    try {
        accessSync(path.join(pathString));
    } catch {
        createEmptyDataFile(pathString);
    }
    return pathString;
};

const getPathString = () => {
    if (process.env.NODE_ENV === "development") {
        return path.resolve("data.json");
    } else if (process.platform === "win32") {
        return path.join(process.env.APPDATA, "explower", "data.json");
    } else {
        throw new Error("data.json の保存先が設定されていません。");
    }
};

const createEmptyDataFile = (pathString: string) => {
    const data: Data = {
        locations: [],
        tags: {},
        items: [],
        commands: {
            image: [],
            images: [],
            video: [],
            videos: [],
            other: [],
        },
    };
    writeFileSync(pathString, JSON.stringify(data));
};

const adapter =
    process.env.NODE_ENV === "test"
        ? new MemorySync<Data>()
        : new JSONFileSync<Data>(getDataFilePath());
const db = new LowSync(adapter);

const get = () => {
    db.read();
    return db.data;
};
const getChain = () => {
    db.read();
    return lodash.chain(db.data);
};
const getLocations = (): Locations => get().locations;
const getItems = (): Item[] => get().items;
const getItemById = (id: string): Item | undefined =>
    getChain().get("items").find({ id }).value();
const getItemByLocation = (location: string): Item =>
    getChain().get("items").find({ location }).value();
const getTags = (): Tags => get().tags;
const getCommands = (): Commands => get().commands;

const addItem = (item: Item): void => {
    const items = getChain().get("items").push(item).value();
    db.data.items = items;
    db.write();
};

const addItems = (newItems: Item[]): void => {
    const items = getChain()
        .get("items")
        .push(...newItems)
        .value();
    db.data.items = items;
    db.write();
};

const removeItem = (location: string): void => {
    getChain().get("items").remove({ location }).value();
    db.write();
};

const updateData = (data: Data): void => {
    db.data = data;
    db.write();
};
const updateItem = (item: Item): void => {
    const index = getChain()
        .get("items")
        .findIndex({ location: item.location })
        .value();
    getChain()
        .get("items")
        .update(`items[${index}]`, () => item)
        .value();
    db.write();
};
const updateItemTags = (location: string, tags: string[]): void => {
    const item = getItemByLocation(location);
    item.tags = tags;
    updateItem(item);
};

export {
    getLocations,
    getItems,
    getItemById,
    getItemByLocation,
    getTags,
    getCommands,
    addItem,
    addItems,
    removeItem,
    updateData,
    updateItem,
    updateItemTags,
};
