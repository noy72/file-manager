import assert from "assert";
import proxyquire from "proxyquire";
import { Item } from "../../../../src/main/models/Item";

const createItem = (location: string, tags: string[]): Item => ({
    location: location,
    tags: tags,
    updatedAt: "",
    thumbnail: "",
    isDir: () => false,
    thumbnailPath: () => "",
    open: () => "",
});

const items = [
    ["/a/bb/ccc/1-a", "x"],
    ["/a/bb/2-a", "x"],
    ["/a/bb/3-b", "x", "y"],
    ["/a/4-c", "y"],
    ["/a/5-c", "xx"]
].map(x => createItem(x[0], x.slice(1)));

const stubItem = proxyquire("../../../../src/main/domain/service/item", {
    "../../repositories/itemRepository": {
        getItems: () => items
    }
});

it("perfectMatchingByTitle", () => {
    {
        const result: Item[] = stubItem.searchItems('"a"');
        assert.deepStrictEqual(
            result.map(item => item.location),
            []
        );
    }
    {
        const result: Item[] = stubItem.searchItems('"3-b"');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b"
            ]
        );
    }
});

it("partialMatchingByTitle", () => {
    {
        const result: Item[] = stubItem.searchItems('a');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/ccc/1-a",
                "/a/bb/2-a"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('3-b');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('-');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/ccc/1-a",
                "/a/bb/2-a",
                "/a/bb/3-b",
                "/a/4-c",
                "/a/5-c"
            ]
        );
    }
});

it("perfectMatchingByTag", () => {
    {
        const result: Item[] = stubItem.searchItems('#"x"');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/ccc/1-a",
                "/a/bb/2-a",
                "/a/bb/3-b"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('#"x" #"y"');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('#"xx"');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/5-c"
            ]
        );
    }
});

it("partialMatchingByTag", () => {
    {
        const result: Item[] = stubItem.searchItems('#x');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/ccc/1-a",
                "/a/bb/2-a",
                "/a/bb/3-b",
                "/a/5-c"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('#x #y');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b",
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems('#xx');
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/5-c"
            ]
        );
    }
});