import { addItem, getCommands, getItems, getLocations, getTags, removeItem, updateData, updateItem, updateItemTags } from ' ../../../src/main/infrastructure/lowdb';
import { Data } from '../../../src/types';
import { createItem } from '../../utils';



const getData = (): Data => ({
    locations: [
        "/path/1",
        "/path/2",
    ],
    commands: {
        "com1": ["a", "b", "c"],
        "com2": ["1", "2"],
    },
    tags: {
        "group1": ["aa"],
        "group2": ["xx"]
    },
    items: []
});

describe('read', () => {
    beforeAll(() => {
        updateData(getData());
        ["/path/1/a", "/path/1/b"].forEach(location =>
            addItem(createItem({ location })));
    });

    test('getLocations', () => {
        expect(getLocations()).toEqual([
            "/path/1", "/path/2"
        ]);
    })

    test('getItems', () => {
        const items = getItems();
        expect(items.length).toBe(2);
        expect(items[0].location).toBe("/path/1/a");
    });

    test('getTags', () => {
        expect(getTags()["group1"]).toEqual(["aa"]);
    });

    test('getCommands', () => {
        expect(getCommands()["com1"]).toEqual(["a", "b", "c"]);
    });
});

describe('items', () => {
    beforeEach(() => {
        updateData(getData());
    });

    test('addItem', () => {
        addItem(createItem());
        addItem(createItem());
        expect(getItems().length).toBe(2);
    });

    test('removeItem', () => {
        const location = "location";
        addItem(createItem({ location }));
        addItem(createItem());
        removeItem(location);

        const items = getItems();
        expect(items.length).toBe(1);
        expect(items[0].location).not.toBe(location);
    });

    test('updateItem', () => {
        const tags = ["a"];
        const item = createItem({ tags });
        addItem(item);
        expect(getItems()[0].tags).toEqual(tags);

        const tags2 = ["b"];
        item.tags = tags2;
        updateItem(item);
        expect(getItems()[0].tags).toEqual(tags2);
    });

    test('updateItemTags', () => {
        const location = "location";
        const tags = ["a"];
        const item = createItem({ location, tags });
        addItem(item);
        expect(getItems()[0].tags).toEqual(tags);

        const tags2 = ["b"];
        item.tags = tags2;
        updateItemTags(location, tags2);
        expect(getItems()[0].tags).toEqual(tags2);
    });
});

