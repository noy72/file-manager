import assert from "assert";
import proxyquire from "proxyquire";
import { Item } from "../../../src/models/Item";

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

const stubItem = proxyquire("../../../src/domain/service/item", {
    "../../repositories/itemRepository": {
        getItems: () => items
    }
});

it("searchItemsByString", () => {
    {
        const result: Item[] = stubItem.searchItems("a");
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/ccc/1-a",
                "/a/bb/2-a"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems("b");
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b"
            ]
        );
    }
});

it("searchItemsByTags", () => {
    {
        const result: Item[] = stubItem.searchItems("#x");
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
        const result: Item[] = stubItem.searchItems("#x #y");
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/bb/3-b"
            ]
        );
    }
    {
        const result: Item[] = stubItem.searchItems("#xx");
        assert.deepStrictEqual(
            result.map(item => item.location),
            [
                "/a/5-c"
            ]
        );
    }
});