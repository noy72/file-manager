import * as assert from "assert";
import { getTags } from "../../../src/main/infrastructure/database";
import { sampleDirPath } from "../../testUtils";

it('getTagList', function () {
    console.log(getTags());
});