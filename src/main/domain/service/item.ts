import { basename } from "path";
import { Item } from "../../models/Item";
import { getItems } from "../../repositories/itemRepository";

type ItemOrder = 'createdAt_desc' | 'createdAt_asc' | 'title_asc';
const itemCompareFunctions: { [key in ItemOrder]: (i1: Item, i2: Item) => number } = {
    'createdAt_desc': (i1: Item, i2: Item) => new Date(i1.updatedAt) == new Date(i2.updatedAt) ? 0 : (new Date(i1.updatedAt) < new Date(i2.updatedAt) ? 1 : -1),
    'createdAt_asc': (i1: Item, i2: Item) => new Date(i1.updatedAt) == new Date(i2.updatedAt) ? 0 : (new Date(i1.updatedAt) < new Date(i2.updatedAt) ? -1 : 1),
    'title_asc': (i1: Item, i2: Item) => basename(i1.location) === basename(i2.location) ? 0 : (basename(i1.location) < basename(i2.location) ? -1 : 1)
};

const MAX_ITEMS = 50;  // Maximum number of items that can be displayed on a page

/**
 * Split query by spaces to list of word(string).
 * Strings that contain spaces and are enclosed in double quotes will not be split by spaces.
 * @param query 
 */
const splitQueryString = (query: string): string[] => {
    const splitedWithSpace = query.split(' ');
    const words = [];
    for (let i = 0; i < splitedWithSpace.length; i++) {
        const word = splitedWithSpace[i];
        if (i == 0) {
            words.push(word);
            continue;
        }

        if (word[word.length - 1] === "\"") {
            words[words.length - 1] += ` ${word}`;
        } else {
            words.push(word);
        }
    }
    return words;
};

let memo: [string, Item[]] = [":)", []];  // Save the result of searched before.

const itemLength = (query: string): number => {
    //if (memo[0] === query) return memo[1].length;
    //@ts-ignore
    return searchItemsWithANDQuery(getItems(), ...splitQueryString(query)).length;
};

const searchItems = (query: string, order: ItemOrder = 'title_asc', page = 0): Item[] => {
    //if (memo[0] === query) return memo[1].slice(MAX_ITEMS * page, MAX_ITEMS * (page + 1));
    //@ts-ignore
    const items = searchItemsWithANDQuery(getItems(), ...splitQueryString(query))
        .sort(itemCompareFunctions[order]);
    memo = [query, items];
    return items.slice(MAX_ITEMS * page, MAX_ITEMS * (page + 1));
};

const searchItemsWithANDQuery = (items: Item[], word: string, ...words: string[]): Item[] => {
    let result;
    if (isTag(word)) {
        const tag = word.slice(1, word.length);
        result = isPerfectMatchingQuery(tag) ?
            perfectMatchingByTag(items, tag.slice(1, tag.length - 1)) :
            partialMatchingByTag(items, tag);
    } else {
        result = isPerfectMatchingQuery(word) ?
            perfectMatchingByTitle(items, word.slice(1, word.length - 1)) :
            partialMatchingByTitle(items, word);
    }

    if (words.length === 0) return result;
    // @ts-ignore
    return searchItemsWithANDQuery(result, ...words);
};

const isTag = (str: string): boolean => str[0] === '#';

const isPerfectMatchingQuery = (str: string): boolean => str[0] === '"' && str[str.length - 1] === '"';

const perfectMatchingByTitle = (items: Item[], title: string): Item[] =>
    items.filter(({ location: location }) => basename(location) === title);

const partialMatchingByTitle = (items: Item[], title: string): Item[] =>
    items.filter(({ location: location }) => basename(location).includes(title));

const perfectMatchingByTag = (items: Item[], tag: string): Item[] =>
    items.filter(({ tags: tags }) => tags.includes(tag));

const partialMatchingByTag = (items: Item[], query: string): Item[] =>
    items.filter(({ tags: tags }) => tags.some(tag => tag.includes(query)));

export { ItemOrder, MAX_ITEMS, itemLength, searchItems, splitQueryString };