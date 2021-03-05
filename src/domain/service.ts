import { readdirSync } from "fs";
import { join, basename } from "path";
import { Item } from "../models/Item";
import { addItems, classify, getItems } from "../repositories/itemRepository";
import { getRootLocations } from "../repositories/locationRepository";
import { isDotFile } from "./file";

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

const parseTagString = (str: string): string[] => {
    const word = str.split(':');
    if (word.length > 2) {
        throw new Error("コロンが2つ以上含まれています．");
    }
    return word.length == 2 ? word : ['Prop', word[0]];
}

export { searchItems, parseTagString };
