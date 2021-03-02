import { readdirSync, statSync } from "fs";
import { join, basename } from "path";
import { getSpecifiedObject, getLocations } from "./infrastructure/database";
import { Item } from "./models/Item";
import { addItems, getItems } from "./repositories/itemRepository";


const getNewItemList = (): Item[] => {
    const locationList = getItemLocationList();
    return getLocatedItemPathList()
        .filter(itemLocation => statSync(itemLocation).isDirectory())
        .filter(itemLocation => !locationList.includes(itemLocation))
        .map(getSpecifiedObject);
};

const getLocatedItemPathList = (): string[] => getLocations().flatMap(
    location => readdirSync(location).flatMap((dir: string) => join(location, dir)));

const getItemLocationList = (): string[] => getItems().map(item => item.location);


// @ts-ignore
const searchItems = (query: string): Item[] => searchItemsWithANDQuery(getItems(), ...query.split(' '));

const searchItemsWithANDQuery = (items: Item[], word: string, ...words: string[]): Item[] => {
    let result;
    if (isTag(word)) {
        result = searchItemsByTag(items, word.slice(1, word.length));
    } else {
        result = searchItemsByTitle(items, word);
    }

    if (words.length === 0) return result;
    // @ts-ignore
    return searchItemsWithANDQuery(result, ...words);
};


const isTag = (str: string): boolean => str[0] === '#';

const searchItemsByTitle = (items: Item[], title: string): Item[] =>
    items.filter(({ location: location }) => basename(location).includes(title));

const searchItemsByTag = (items: Item[], tag: string): Item[] =>
    items.filter(({ tags: tags }) => tags.includes(tag));

const addNewItemList = (): void => addItems(getNewItemList());

export { getNewItemList, searchItems, addNewItemList }
