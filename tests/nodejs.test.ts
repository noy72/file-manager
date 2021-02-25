import * as assert from "assert";
import * as fs from "fs";
import {sampleDirPath} from "./testUtils";

it('readdirSync', function () {
    const dirs = fs.readdirSync(sampleDirPath);
    assert.strictEqual(dirs.length, 7);
    for (let i = 1; i < dirs.length; i++) {
        assert.strictEqual(dirs[i], `dir0${i}`);
    }
});
