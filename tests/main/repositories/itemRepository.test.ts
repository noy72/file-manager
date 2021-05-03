import assert from "assert";
import proxyquire from "proxyquire";
import Directory from "../../../src/main/models/Directory";
import { Item } from "../../../src/main/models/Item";
import { createItem } from "../utils";


describe('itemRepositoryTest', () => {
    before(function () {
        this.db = [];
        this.stabItemRepo = proxyquire("../../../src/main/repositories/itemRepository", {
            "../infrastructure/database": {
                updateItems: (items: Item[]) => this.db = items,
                getItems: () => this.db
            }
        });
    });

    beforeEach(function () {
        this.db = [];
    });

    it('update item', function () {
        const location = '/sample/dir'
        const item = new Directory(createItem(location, ['x', 'y']));
        this.stabItemRepo.addItems([item]);

        assert.deepStrictEqual(item, this.stabItemRepo.getItems()[0]);
        item["tags"] = ['a'];
        this.stabItemRepo.updateItem(item);
        assert.deepStrictEqual(item, this.stabItemRepo.getItems()[0]);
        item["tags"] = ['x', 'y'];
        this.stabItemRepo.updateItem(item);
        assert.deepStrictEqual(item, this.stabItemRepo.getItems()[0]);
    });
});