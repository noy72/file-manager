import { getItems, updateData } from "../../../src/main/infrastructure/lowdb";
import {
    filterItems,
    findItemByQuery,
    sortItems,
    splitQuery,
} from "../../../src/main/repositories/item";
import { createData, createItem } from "../../utils";

test("splitQuery", () => {
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

describe("filterItems", () => {
    const items = [
        createItem({ location: "ab", tags: ["ab"] }),
        createItem({ location: "abc", tags: ["abc"] }),
        createItem({ location: "abc", tags: ["ab"] }),
        createItem({ location: "ab", tags: ["abc"] }),
    ];

    test("by title", () => {
        expect(filterItems(items, splitQuery("ab")).length).toBe(4);
    });

    test("by tag", () => {
        expect(filterItems(items, splitQuery("b")).length).toBe(4);
    });

    test("perfect match by title", () => {
        expect(filterItems(items, splitQuery('"ab"')).length).toBe(2);
    });

    test("perfect match by tag", () => {
        expect(filterItems(items, splitQuery('#"ab"')).length).toBe(2);
    });

    test("perfect match by title and perfect match by tag", () => {
        expect(filterItems(items, splitQuery('"ab" #"ab"')).length).toBe(1);
    });

    test("query with space", () => {
        const items = [
            createItem({ location: "ab" }),
            createItem({ location: "abc" }),
            createItem({ location: "a b" }),
        ];
        expect(filterItems(items, splitQuery("a b")).length).toBe(3);
        expect(filterItems(items, splitQuery('"a b"')).length).toBe(1);
    });
});

describe("sortItems", () => {
    const items = [
        createItem({ location: "1", createdAt: new Date("2022-01-03") }),
        createItem({ location: "2", createdAt: new Date("2022-01-02") }),
        createItem({ location: "3", createdAt: new Date("2022-01-01") }),
    ];

    test("order by location asc", () => {
        expect(sortItems(items, "location", false)[0].location).toBe("1");
    });

    test("order by location desc", () => {
        expect(sortItems(items, "location", true)[0].location).toBe("3");
    });

    test("order by createdAt asc", () => {
        expect(sortItems(items, "createdAt", false)[0].location).toBe("3");
    });
});

test("findItemByQuery", () => {
    const data = createData();
    data.items = [
        createItem({
            location: "ab",
            tags: ["ab"],
            createdAt: new Date("2022-01-01"),
        }),
        createItem({
            location: "abcd",
            tags: ["abc"],
            createdAt: new Date("2022-01-02"),
        }),
        createItem({
            location: "abcd",
            tags: ["ab"],
            createdAt: new Date("2022-01-03"),
        }),
        createItem({
            location: "abd",
            tags: ["abc"],
            createdAt: new Date("2022-01-04"),
        }),
    ];

    updateData(data);
    const items = findItemByQuery('ab d #"abc"', "createdAt", true);
    expect(items.length).toBe(2);
    expect(items[0].createdAt).toEqual(new Date("2022-01-04"));
});
