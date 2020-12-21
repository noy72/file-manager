const fs = require('fs');
const assert = require('assert').strict;
const rootPath = require('app-root-path');
const jsonioTest = require(`${rootPath}/src/utils/jsonio`);

it('read() and write()', function () {
    const path = `${rootPath}/tests/jsonio_sample.txt`;
    const json = JSON.stringify({"sample": [1, 2, 3]});
    jsonioTest.write(path, json);
    assert.equal(jsonioTest.read(path), json);

    fs.unlinkSync(path);
});
