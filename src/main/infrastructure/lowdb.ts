//import lodashId from 'lodash-id';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Data, Item } from '../models/Item';

let adapter: low.AdapterSync<Data>;
let db: low.LowdbSync<Data>;

// renderer プロセスごとに FileSync するせいで，変更が反映されない．
// 変更する後に FileSync を更新することで変更を反映する．
// renderer で nodejs のコードを実装するのがそもそも良くない．
// TODO: main と renderer の実装を切り離す
const flash = (): void => {
    adapter = new FileSync<Data>(
        'data.json'
    );
    db = low(adapter);
};
flash();

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const getItem = (location: string): Item => db.get('items').find({ location: location }).value();

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

const removeItem = (location: string): ArrayLike<Item> => db.get('items').remove({ location: location }).write();
const updateItem = (item: Item): Item => db.get('items').find({ location: item.location }).assign(item).write();
const updateAttachedTags = (location: string, tags: string[]): Item => db.get('items').find({ location: location }).assign({ tags: tags }).write();


export {
    getLocations,
    getItems,
    getItemById,
    getTags,
    getCommand,
    getItem,
    addItem,
    removeItem,
    updateItem,
    updateAttachedTags,
    flash
};