import { MemorySync, LowSync, JSONFileSync } from "lowdb";
import { accessSync, writeFileSync } from "fs";
import path from "path";
import { Commands, Data, Item, Locations, Tags } from "../../types";
import lodash from "lodash";

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

/* LowDB config */
class LowSyncWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}
const adapter =
    process.env.NODE_ENV === "test"
        ? new MemorySync<Data>()
        : new JSONFileSync<Data>(getDataFilePath());
const db = new LowSyncWithLodash(adapter);
db.read();

/* Add */
const addItem = (newItem: Item): void => {
    db.chain.get("items").push(newItem).value();
    db.write();
};
const addItems = (newItems: Item[]): void => {
    db.chain
        .get("items")
        .push(...newItems)
        .value();
    db.write();
};

/** タグ一覧にタグを追加する。存在しないグループが追加されることはないと仮定する。
 *
 * @param group タググループ名
 * @param tag タグ
 */
const addTag = (group: string, tag: string): void => {
    // TODO: update を使う
    const tags = getTags();
    tags[group] = Array.from(new Set([...tags[group], tag]));
    db.chain.assign({ tags });
    db.write();
};
const addTagToItemById = (id: string, tag: string): void => {
    const index = db.chain.get("items").findIndex({ id }).value();
    db.chain
        .update(["items", index], (item: Item) => ({
            ...item,
            tags: Array.from(new Set([...item.tags, tag])),
            updatedAt: new Date(),
        }))
        .value();
    db.write();
};

/* Get */
const getLocations = (): Locations => db.chain.get("locations").value();
const getItems = (): Item[] => db.chain.get("items").value();
const getItemById = (id: string): Item | undefined =>
    db.chain.get("items").find({ id }).value();
const getItemByLocation = (location: string): Item =>
    db.chain.get("items").find({ location }).value();
const getTags = (): Tags => db.chain.get("tags").value();
const getCommands = (): Commands => db.chain.get("commands").value();

/* Update */
const updateData = (data: Data): void => {
    db.data = data;
    db.write();
};
const updateItem = (item: Item): void => {
    const index = db.chain.get("items").findIndex({ id: item.id }).value();
    db.chain
        .update(["items", index], () => ({ ...item, updatedAt: new Date() }))
        .value();
    db.write();
};
const updateOpenedAtById = (id: string): void => {
    db.chain
        .get("items")
        .find({ id })
        .update("openedAt", () => new Date())
        .value();
    db.write();
};

/* Delete */
const removeItemById = (id: string): Item[] => {
    const items = db.chain.get("items").remove({ id }).value();
    db.write();
    return items;
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
    addTag,
    addTagToItemById,
    removeItemById,
    updateData,
    updateItem,
    updateOpenedAtById,
};
