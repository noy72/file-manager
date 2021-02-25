import * as assert from "assert";
import { getTagList, updateTagList } from "../src/database";
import { sampleDirPath } from "./testUtils";

it('getTagList', function () {
    console.log(getTagList());
});

it('updateTagList', () => {
    console.log(getTagList());
    updateTagList('test', 'test_tag');
    console.log(getTagList());
});

