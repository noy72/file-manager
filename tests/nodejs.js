const assert = require('assert').strict;
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json').toString());

it('readdirSync', function () {
    const dirs = fs.readdirSync(data["locations"][0]);
    assert.equal(dirs.length, 5);
    for (let i = 0; i < dirs.length; i++) {
        assert.equal(dirs[i], `dir0${i + 1}`);
    }
});
