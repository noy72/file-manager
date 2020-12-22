const fs = require('fs');
const assert = require('assert').strict;
const rootPath = require('app-root-path');
const jsonio = require(`${rootPath}/src/utils/jsonio`);

it('read() and write()', function () {
    const path = `${rootPath}/tests/jsonio_sample.txt`;
    const json = JSON.stringify({"sample": [1, 2, 3]});
    jsonio.write(path, json);
    assert.equal(jsonio.read(path), json);

    fs.unlinkSync(path);
});
