const assert = require('assert').strict;
const fs = require('fs');
const rootPath = require('app-root-path');

it('readdirSync', function () {
    const dirs = fs.readdirSync(`${rootPath}/tests/sample_dir`);
    assert.equal(dirs.length, 5);
    for (let i = 0; i < dirs.length; i++) {
        assert.equal(dirs[i], `dir0${i + 1}`);
    }
});
