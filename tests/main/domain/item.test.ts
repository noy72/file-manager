import path from "path";
import {
    getItemsForRenderer,
    specifyContentType,
    syncItemsFromLocations,
} from "../../../src/main/domain/item";
import { getItems, updateData } from "../../../src/main/infrastructure/lowdb";
import { assetsPath, createData, createItem } from "../../utils";

const loc = (name: string) => path.join(assetsPath, "sample_dir", name);

test("specifyContentType", () => {
    expect(specifyContentType(loc("dir01"))).toBe("images");
    expect(specifyContentType(loc("dir02"))).toBe("videos");
    expect(specifyContentType(loc("dir03"))).toBe("other");
    expect(specifyContentType(loc("img.jpg"))).toBe("image");
    expect(specifyContentType(loc("video.mp4"))).toBe("video");
    expect(specifyContentType(loc("text.txt"))).toBe("other");
});

describe("items", () => {
    beforeEach(() => {
        updateData(createData());
    });

    test("getItemsWithExistance", () => {
        const invalidLocation = "/exist/false";
        const data = createData();
        data.items = [
            createItem({ location: invalidLocation }),
            createItem({ location: loc("dir01") }),
        ];
        updateData(data);

        const items = getItemsForRenderer();
        expect(
            items.find(item => item.location === loc("dir01")).exist
        ).toBeTruthy();
        expect(
            items.find(item => item.location === invalidLocation).exist
        ).toBeFalsy();
    });

    test("syncItemsFormLocations", () => {
        expect(getItems().length).toBe(0);
        syncItemsFromLocations();
        expect(getItems().length).toBe(0);

        const data = createData();
        data.locations = [path.join(assetsPath, "sample_dir")];
        updateData(data);
        syncItemsFromLocations();
        expect(getItems().length).toBe(6);
    });
});
