import {readdirSync, statSync} from "fs";
import {join, basename} from "path";
import {getItemList, getLocationList, updateItemList} from "./database";
import {isImageFile, isVideoFile} from "./utils/file";
import Item from "./models/Item";
import Directory from "./models/Directory";


const getNewItemList = (): Item[] => {
    const locationList = getItemLocationList();
    return getLocatedItemPathList()
        .filter(itemLocation => statSync(itemLocation).isDirectory())
        .filter(itemLocation => !locationList.includes(itemLocation))
        .map(itemLocation => {
            console.log("itemLocation", itemLocation)
            if (isImageFile(itemLocation)) {
                throw new Error("画像ファイルは未対応");
            } else if (isVideoFile(itemLocation)) {
                throw new Error("動画ファイルは未対応");
            }
            return new Directory(itemLocation);
        });
};

const getLocatedItemPathList = (): string[] => getLocationList().flatMap(
    location => readdirSync(location).flatMap((dir: string) => join(location, dir)));

const getItemLocationList = (): string[] => getItemList().map(item => item.location);


// @ts-ignore
const searchItems = (query: string): Item[] => searchItemsWithANDQuery(getItemList(), ...query.split(' '));

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
    items.filter(({location: location}) => basename(location).includes(title));

const searchItemsByTag = (items: Item[], tag: string): Item[] =>
    items.filter(({tags: tags}) => tags.includes(tag));

const addNewItemList = (): void => updateItemList([...getItemList(), ...getNewItemList()]);

export {getNewItemList, searchItems, addNewItemList}
