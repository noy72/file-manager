import { v1, v3, v4, v5 } from 'uuid';
import {
    addItem,
    addItems,
    addTag,
    addTagToItemById,
    getCommands,
    getItemById,
    getItemByLocation,
    getItems,
    getLocations,
    getTags,
    removeItemById,
    updateData,
    updateItem,
} from " ../../../src/main/infrastructure/lowdb";
import { createData, createItem } from "../../utils";

describe("Get", () => {
    beforeAll(() => {
        const data = createData({
            locations: ["/path/1", "/path/2"],
            tags: { group1: ["aa"] },
            commands: { image: ["a", "b", "c"] },
            items: [
                createItem({ id: "id_1", location: "/path/1/a" }),
                createItem({ id: "id_2", location: "/path/2/b" }),
            ]
        });
        updateData(data);
    });

    test("Locations", () => {
        expect(getLocations()).toEqual(["/path/1", "/path/2"]);
    });

    test("Items", () => {
        const items = getItems();
        expect(items.length).toBe(2);
        expect(items[0].id).toBe("id_1");
    });

    test("ItemById", () => {
        const item = getItemById("id_1");
        expect(item.id).toBe("id_1");
        expect(item.location).toBe("/path/1/a");
        expect(getItemById("undefined")).toBeUndefined();
    });

    test("ItemByLocation", () => {
        const item = getItemByLocation("/path/1/a");
        expect(item.id).toBe("id_1");
        expect(item.location).toBe("/path/1/a");
        expect(getItemByLocation("undefined")).toBeUndefined();
    });

    test("getTags", () => {
        expect(getTags()["group1"]).toEqual(["aa"]);
    });

    test("getCommands", () => {
        expect(getCommands()["image"]).toEqual(["a", "b", "c"]);
    });
});

describe("Update", () => {
    beforeEach(() => {
        updateData(createData());
    });

    test("Item", () => {
        const tags = ["a"];
        const item = createItem({ tags });
        addItem(item);
        expect(getItems()[0].tags).toEqual(tags);

        const tags2 = ["b"];
        item.tags = tags2;
        updateItem(item);
        expect(getItems()[0].tags).toEqual(tags2);
    });

});

describe("Add", () => {
    beforeEach(() => {
        updateData(createData());
    });

    test("Item", () => {
        addItem(createItem());
        addItem(createItem());
        expect(getItems().length).toBe(2);
    });

    test("Items", () => {
        addItems([createItem(), createItem()]);
        expect(getItems().length).toBe(2);
    });

    test("Tag", () => {
        const group = "group1";
        const tag = "tag2";
        updateData(createData({ tags: { [group]: ["tag1"] } }))
        addTag(group, tag);
        expect(getTags()[group]).toEqual(["tag1", tag]);
    });

    test("TagToItemById", () => {
        const id = "id";
        const item = createItem({ id });
        addItem(item);
        expect(getItems()[0].tags).toEqual([]);
        addTagToItemById(id, 'a');
        expect(getItems()[0].tags).toEqual(["a"]);
    });
});

describe("Delete", () => {
    beforeEach(() => {
        updateData(createData());
    });

    test("Item", () => {
        const id = "id";
        expect(getItems().length).toBe(0);

        addItem(createItem({ id }));
        expect(getItems().length).toBe(1);

        const removedItem = removeItemById(id);
        expect(removedItem[0].id).toBe(id);

        expect(getItems().length).toBe(0);
    });
});
