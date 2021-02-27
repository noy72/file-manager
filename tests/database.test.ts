import * as assert from "assert";
import { getTags, updateTagList } from "../src/database";
import { sampleDirPath } from "./testUtils";

it('getTagList', function () {
    console.log(getTags());
});

it('updateTagList', () => {
    console.log(getTags());
    updateTagList('test', 'test_tag');
    console.log(getTags());
});

