const assert = require('assert').strict;
const fs = require('fs');
const {sampleDirPath} = require('./testUtils');

it('readdirSync', function () {
    const dirs = fs.readdirSync(sampleDirPath);
    assert.equal(dirs.length, 7);
    for (let i = 1; i < dirs.length; i++) {
        assert.equal(dirs[i], `dir0${i}`);
    }
});
