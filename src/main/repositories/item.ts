/*
クエリストリングからアイテムを検索する
並び替え
特定のアイテムを取得する
アイテムを特定のソフトウェアで開く
アイテムを削除する
アイテムのタグを付け替える
タグの一覧を取得する
*/

import { basename } from "path";
import { Item } from "../../types";

type SearchQuery = {
    word: string
    perfectMatch: boolean
    isTag: boolean
};

const getItems = (query: string, order: keyof Item, desc: boolean) => {
    const searchQuery = splitQuery(query.trim());

};

export const splitQuery = (query: string): SearchQuery[] => {
    const searchQuery: SearchQuery[] = [];
    let closed = false;
    let tmp: SearchQuery = {
        word: "",
        perfectMatch: false,
        isTag: false,
    };
    for (let i = 0; i < query.length; i++) {
        if (closed) {
            if (query[i] === "\"") {
                closed = false;
            } else {
                tmp.word += query[i];
            }
        } else {
            if (query[i] === " ") {
                searchQuery.push(tmp);
                tmp = {
                    word: "",
                    perfectMatch: false,
                    isTag: false,
                };
            } else if (query[i] === "#") {
                tmp.isTag = true;
            } else if (query[i] === "\"") {
                tmp.perfectMatch = true;
                closed = true;
            } else {
                tmp.word += query[i];
            }
        }
    }
    if (tmp.word.length > 0) searchQuery.push(tmp);
    return searchQuery;
};

export const filterItems = (items: Item[], searchQuery: SearchQuery[]): Item[] => {
    let filteredItems = items;
    searchQuery.forEach(query => {
        if (query.isTag) {
            filteredItems = filteredItems.filter(item => item.tags.some(
                tag => query.perfectMatch ?
                    tag === query.word :
                    tag.includes(query.word)
            ));
        } else {
            filteredItems = filteredItems.filter(item => query.perfectMatch ?
                basename(item.location) === query.word :
                basename(item.location).includes(query.word)
            );
        }
    });
    return filteredItems;
};

export const sortItems = (items: Item[], key: keyof Item, desc: boolean): Item[] =>
    items.sort((a: Item, b: Item) => {
        const aVal = key === 'location' ? basename(a[key]) : a[key];
        const bVal = key === 'location' ? basename(b[key]) : b[key];
        if (aVal === bVal) return 0;
        return (aVal < bVal ? -1 : 1) * (desc ? -1 : 1);
    });
