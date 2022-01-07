import lodash from 'lodash';
import { MemorySync, LowSync, JSONFileSync } from 'lowdb';
import path from 'path';
import { Commands, Data, Item, Locations, Tags } from '../../types';

const getDataFilePath = () => {
    if (process.platform === 'win32') {
        return path.join(
            process.env.APPDATA,
            'explower',
            'data.json',
        )
    }
    throw new Error("data.json の保存先が設定されていません。");
};

const adapter = process.env.NODE_ENV === 'test' ?
    new MemorySync<Data>() : new JSONFileSync<Data>(getDataFilePath());
const db = new LowSync(adapter);

const get = () => {
    db.read();
    return db.data;
};
const getChain = () => {
    db.read();
    return lodash.chain(db.data);
}
const getLocations = (): Locations => get().locations;
const getItems = (): Item[] => get().items;
const getItemByLocation = (location: string): Item => getChain().get('items').find({ location }).value();
const getTags = (): Tags => get().tags;
const getCommands = (): Commands => get().commands;

const addItem = (item: Item): void => {
    const items = getChain().get('items').push(item).value();
    db.data.items = items;
    db.write();
};

const addItems = (newItems: Item[]): void => {
    const items = getChain().get('items').push(...newItems).value();
    db.data.items = items;
    db.write();
};

const removeItem = (location: string): void => {
    getChain().get('items').remove({ location }).value();
    db.write();
};

const updateData = (data: Data): void => {
    db.data = data;
    db.write();
};
const updateItem = (item: Item): void => {
    const index = getChain().get('items').findIndex({ location: item.location }).value();
    getChain().get('items').update(`items[${index}]`, () => item).value();
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
    getTags,
    getCommands,
    addItem,
    addItems,
    removeItem,
    updateData,
    updateItem,
    updateItemTags,
};
