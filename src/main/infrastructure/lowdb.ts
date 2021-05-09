//import lodashId from 'lodash-id';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import rootpath from '../../../rootpath';
import { Data, Item } from '../models/Item';

let adapter: low.AdapterSync<Data>;
let db: low.LowdbSync<Data>;

// renderer プロセスごとに FileSync するせいで，変更が反映されない．
// 変更する後に FileSync を更新することで変更を反映する．
// renderer で nodejs のコードを実装するのがそもそも良くない．
// TODO: main と renderer の実装を切り離す
const flash = (): void => {
    adapter = new FileSync<Data>(
        (process.env.IS_TEST || process.argv.includes('IS_TEST')) ?
            rootpath('tests/data/data.json') :
            'data.json'
    );
    db = low(adapter);
};
flash();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = (key: string): any => db.get(key).value();
const getLocations = (): string[] => get('locations');
const getItems = (): Item[] => get('items');
const getTags = (): { [index: string]: string[] } => get('tags');
const getCommand = (key: string): string[] => get('commands')[key];

const getItem = (location: string): Item => db.get('items').find({ location: location }).value();

const addItem = (item: Item): ArrayLike<Item> => db.get('items').push(item).write();

const removeItem = (location: string): ArrayLike<Item> => db.get('items').remove({ location: location }).write();
const updateItem = (item: Item): Item => db.get('items').find({ location: item.location }).assign(item).write();
const updateAttachedTags = (location: string, tags: string[]): Item => db.get('items').find({ location: location }).assign({ tags: tags }).write();


export {
    getLocations,
    getItems,
    getTags,
    getCommand,
    getItem,
    addItem,
    removeItem,
    updateItem,
    updateAttachedTags,
    flash
};