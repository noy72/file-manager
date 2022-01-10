import { v1, v3, v4, v5 } from 'uuid';
import {
    addItem,
    addItems,
    getCommands,
    getItemById,
    getItems,
    getLocations,
    getTags,
    removeItem,
    updateData,
    updateItem,
    updateItemTags,
} from " ../../../src/main/infrastructure/lowdb";
import { createData, createItem } from "../../utils";

describe("read", () => {
    beforeAll(() => {
        const data = createData();
        data.locations = ["/path/1", "/path/2"];
        data.tags = { group1: ["aa"] };
        data.commands.image = ["a", "b", "c"];
        updateData(data);
        ["/path/1/a", "/path/1/b"].forEach(location =>
            addItem(createItem({ id: location, location }))  // id を location で代用
        );
    });

    it('getItems', () => {
        const item = db.getItems()[0];
        assert.strictEqual(
            item.location,
            path.join(__dirname, '../../sample_dir/dir01')
        );
        assert.deepStrictEqual(
            item.tags,
            ["1"]
        );
        assert.strictEqual(
            item.thumbnail,
            path.join(__dirname, '../../sample_dir/dir01/code01.png')
        );
    });

    it('getTags', () => {
        assert.deepStrictEqual(
            db.getTags(),
            {
                '日本語タグ': [
                    'タグ'
                ],
                group_1: [
                    '1'
                ],
                group_2: [
                    'a'
                ]
            }
        );
    });

<<<<<<< HEAD
    test("getItemById", () => {
        const item = getItemById("/path/1/a");
        expect(item.location).toBe("/path/1/a");
        expect(item.id).toBe("/path/1/a")

        expect(getItemById("undefined")).toBeUndefined();
    });

    test("getTags", () => {
        expect(getTags()["group1"]).toEqual(["aa"]);
=======
    it('getCommands', () => {
        assert.deepStrictEqual(
            db.getCommand('directory'),
            ["cp", rootpath("tests/renderer/tmp_files/directory.txt")],
        );
>>>>>>> 2315bb1 (Revert "アイテムを並べて表示できるようにした")
    });

    it('addItem', () => {
        const location = '/path/sample_dir';
        const item = createItem(location, ['tag1', 'tag2']);
        db.addItem(item);
        const savedItem = db.getItem(location);
        assert.deepStrictEqual(item, savedItem);
    });

    it('removeItem', () => {
        const location = '/path/sample_dir01';
        const item = createItem(location, ['tag1', 'tag2']);
        db.addItem(item);
        assert.deepStrictEqual(item, db.getItem(location));
        db.removeItem(location);
        assert.deepStrictEqual(undefined, db.getItem(location));
    });

    it('updateItem', () => {
        const location = '/path/sample_dir';
        const item = createItem(location, ['tag1', 'tag2']);
        db.addItem(item);
        assert.deepStrictEqual(['tag1', 'tag2'], db.getItem(location).tags);
        item.tags = ['x'];
        db.updateItem(item);
        assert.deepStrictEqual(['x'], db.getItem(location).tags);
    });

    it('updateAttachedTags', () => {
        const location = '/path/sample_dir01';
        const item = createItem(location, ['tag1', 'tag2']);
        db.addItem(item);
        assert.deepStrictEqual(['tag1', 'tag2'], db.getItem(location).tags);
        db.updateAttachedTags(location, ['y']);
        assert.deepStrictEqual(['y'], db.getItem(location).tags);
    });
});