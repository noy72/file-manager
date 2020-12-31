const assert = require('assert');
const rewire = require('rewire');
const {sampleDirPath} = require('./testUtils');
const controller = require('../src/controller');
const {ItemInfo} = require('../src/model');

const rewireController = rewire('../src/controller');

const data = {
    "locations": [sampleDirPath],
    "items": {
        [`${sampleDirPath}/dir01`]: null,
        [`${sampleDirPath}/dir03`]: null,
        [`${sampleDirPath}/dir05`]: null,
    },
};

it('getLocatedAllItemPaths', () => {
    const itemPaths = rewireController.__get__('getLocatedAllItemPaths')(data["locations"]).sort();
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
        rewireController.__get__('searchItemsByTitle')(items, 'a'),
        {
            "a": 0,
            "abc": 1,
            "zzazz": 3
        }
    );
    assert.deepStrictEqual(
        rewireController.__get__('searchItemsByTitle')(items, 'df'),
        {}
    );
    assert.deepStrictEqual(
        rewireController.__get__('searchItemsByTitle')(items, ''),
        items
    );
});

it('searchItemsWithANDQuery', () => {
    const items = {
        "a b c": 0,
        "b c z": 1,
        "a a": 2,
        "c b a": 3,
    };
    assert.deepStrictEqual(
        rewireController.__get__('searchItemsWithANDQuery')(items, ...'b c a'.split(' ')),
        {
            "a b c": 0,
            "c b a": 3,
        }
    )
});
