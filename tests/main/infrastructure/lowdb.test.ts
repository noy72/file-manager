
import * as assert from 'assert';
import path from "path";
import * as db from '../../../src/main/infrastructure/lowdb';
import { createItem } from '../utils';
import rootpath from '../../../rootpath';
import { resetDataJson } from '../../utils';


describe('lowdb test', () => {
    beforeEach(function () {
        resetDataJson();
        db.flash();
    });


    it('getLocations', () => {
        assert.deepStrictEqual(
            db.getLocations(),
            [path.join(__dirname, '../../sample_dir')]
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

    it('getCommands', () => {
        assert.deepStrictEqual(
            db.getCommand('directory'),
            ["cp", rootpath("tests/renderer/tmp_files/directory.txt")],
        );
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