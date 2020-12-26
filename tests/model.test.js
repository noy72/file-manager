const assert = require('assert');
const {sampleDirPath} = require('./testUtils');
const {ItemInfo, itemTypes} = require('../src/model');

const dir04Path = `${sampleDirPath}/dir04`;
const dir05Path = `${sampleDirPath}/dir05`;

it('ItemInfo constructor', () => {
    const dir04 = new ItemInfo(dir04Path);
    assert.strictEqual(dir04.type, itemTypes.IMAGES);
    assert.strictEqual(dir04.thumbnail, `${dir04Path}/grey.png`);

    const dir05 = new ItemInfo(dir05Path);
    assert.strictEqual(dir05.type, itemTypes.DIR);
    assert.strictEqual(dir05.thumbnail, `${dir05Path}/code02.png`);
});
