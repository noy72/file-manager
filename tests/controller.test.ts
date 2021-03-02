import * as assert from "assert";
import * as controller from "../src/domain/service";
import { sampleDirPath } from "./testUtils";
import Directory from "../src/models/Directory";

const rewire = require('rewire');
const rewireController = rewire('../src/domain/service');

const data = {
    "locations": [sampleDirPath],
    "items": {
        [`${sampleDirPath}/dir01`]: null,
        [`${sampleDirPath}/dir03`]: null,
        [`${sampleDirPath}/dir05`]: null,
    },
};

it('searchItems', () => {
    assert.ok(controller.searchItems('dir01')[0].location.includes('dir01'));
    assert.ok(controller.searchItems('#aa')[0].location.includes('dir02'));
});
