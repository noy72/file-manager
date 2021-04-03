import { basename } from "path";
import { isTemplateSpan } from "typescript";
import { Item } from "../../models/Item";
import { getItems } from "../../repositories/itemRepository";

//@ts-ignore
const searchItems = (query: string): Item[] => searchItemsWithANDQuery(getItems(), ...query.split(' '));

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

export { searchItems };