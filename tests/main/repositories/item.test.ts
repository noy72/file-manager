import { filterItems, splitQuery } from '../../../src/main/repositories/item';
import { createItem } from '../../utils';

test('splitQuery', () => {
    const words = splitQuery('abc "a b c" #xyz #"x y z"');
    expect(words).toEqual([
        {
            word: "abc",
            perfectMatch: false,
            isTag: false,
        },
        {
            word: "a b c",
            perfectMatch: true,
            isTag: false,
        },
        {
            word: "xyz",
            perfectMatch: false,
            isTag: true,
        },
        {
            word: "x y z",
            perfectMatch: true,
            isTag: true,
        },
    ]);
});

describe('filterItems', () => {
    const items = [
        createItem({ location: "ab", tags: ["ab"] }),
        createItem({ location: "abc", tags: ["abc"] }),
        createItem({ location: "abc", tags: ["ab"] }),
        createItem({ location: "ab", tags: ["abc"] }),
    ];

    test('by title', () => {
        expect(filterItems(items, splitQuery("ab")).length).toBe(4);
    });

    test('by tag', () => {
        expect(filterItems(items, splitQuery("b")).length).toBe(4);
    });

    test('perfect match by title', () => {
        expect(filterItems(items, splitQuery("\"ab\"")).length).toBe(2);
    });

    test('perfect match by tag', () => {
        expect(filterItems(items, splitQuery("#\"ab\"")).length).toBe(2);
    });

    test('perfect match by title and perfect match by tag', () => {
        expect(filterItems(items, splitQuery("\"ab\" #\"ab\"")).length).toBe(1);
    });

    test('query with space', () => {
        const items = [
            createItem({ location: "ab" }),
            createItem({ location: "abc" }),
            createItem({ location: "a b" }),
        ];
        expect(filterItems(items, splitQuery("a b")).length).toBe(3);
        expect(filterItems(items, splitQuery("\"a b\"")).length).toBe(1);
    });
});
