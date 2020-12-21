const fs = require('fs');
const assert = require('assert').strict;
const jsonioTest = require('../src/utils/jsonio');

it('read() and write()', function () {
    const path = 'tests/jsonio_sample.txt';
    const json = JSON.stringify({"sample": [1, 2, 3]});
    jsonioTest.write(path, json);
    assert.equal(jsonioTest.read(path), json);

    fs.unlinkSync(path);
});
