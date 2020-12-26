const assert = require('assert');
const rootPath = require('app-root-path');
const {sampleDirPath} = require(`${rootPath}/tests/testUtils`);
const controller = require(`${rootPath}/src/controller`);
const {ItemInfo} = require(`${rootPath}/src/model`);

const data = {
    "locations": [sampleDirPath],
    "items": {
        [`${sampleDirPath}/dir01`]: null,
        [`${sampleDirPath}/dir03`]: null,
        [`${sampleDirPath}/dir05`]: null,
    },
};

it('getLocatedAllItemPaths', () => {
    const itemPaths = controller.getLocatedAllItemPaths(data["locations"]).sort();
    assert.strictEqual(itemPaths[0], `${sampleDirPath}/.DS_Store`);
    for (let i = 1; i < itemPaths.length; i++) {
        assert.strictEqual(itemPaths[i], `${sampleDirPath}/dir0${i}`)
    }
});

it('syncDataFileWithItems', () => {
    const expectItems = {
        [`${sampleDirPath}/dir01`]: null,
        [`${sampleDirPath}/dir02`]: new ItemInfo(`${sampleDirPath}/dir02`),
        [`${sampleDirPath}/dir03`]: null,
        [`${sampleDirPath}/dir04`]: new ItemInfo(`${sampleDirPath}/dir04`),
        [`${sampleDirPath}/dir05`]: null,
    };
    const newData = controller.syncDataFileWithItems(data);
    for (const [key, value] of Object.entries(newData["items"])) {
        if (value == null) {
            assert.strictEqual(value, null);
        } else {
            assert.strictEqual(value.thumbnail, expectItems[key].thumbnail)
        }
    }
});

it('searchItemsByTitle', () => {
    const items = {
        "a": 0,
        "abc": 1,
        "def": 2,
        "zzazz": 3
    };
    assert.deepStrictEqual(
        controller.searchItemsByTitle(items, 'a'),
        {
            "a": 0,
            "abc": 1,
            "zzazz": 3
        }
    );
    assert.deepStrictEqual(
        controller.searchItemsByTitle(items, 'df'),
        {}
    );
    assert.deepStrictEqual(
        controller.searchItemsByTitle(items, ''),
        items
    );
});

it('__searchItems', () => {
    const items = {
        "a b c": 0,
        "b c z": 1,
        "a a": 2,
        "c b a": 3,
    };
    assert.deepStrictEqual(
        controller.__searchItems(items, '', 'b c a'.split(' ')),
        {
            "a b c": 0,
            "c b a": 3,
        }
    )
});
