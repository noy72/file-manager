const assert = require('assert');
const rootPath = require('app-root-path');
const {sampleDirPath}=  require(`${rootPath}/tests/testUtils`);
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
    for (let i = 0; i < itemPaths.length; i++) {
        assert.strictEqual(itemPaths[i], `${sampleDirPath}/dir0${i + 1}`)
    }
});

it('findNewItemPaths', () => {
    const newItemPaths = controller.findNewItemPaths(data).sort();
    for (let i = 0; i < newItemPaths.length; i++) {
        assert.strictEqual(newItemPaths[i], `${sampleDirPath}/dir0${i * 2 + 2}`)
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
