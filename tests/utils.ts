import path from "path";
import uuid from "uuid";
import { Data, Item, ItemForRenderer } from "../src/types";

export const createData = (data: any = {}): Data => ({
    locations: [],
    commands: {
        image: [],
        images: [],
        video: [],
        videos: [],
        other: [],
    },
    tags: {},
    items: [],
    ...data,
});

export const createItem = (item: any = {}): Item => {
    const v4 = uuid.v4();
    return {
        id: v4,
        location: v4,
        tags: [],
        thumbnail: `${v4}/thumbnail`,
        createdAt: new Date(),
        updatedAt: new Date(),
        openedAt: new Date(),
        type: "other",
        ...item,
    };
};

export const createItemForRenderer = (item: any = {}): ItemForRenderer => {
    return {
        exist: false,
        name: "",
        thumbnailExt: "",
        encodedThumbnail: "",
        ...createItem(),
        ...item,
    };
};

export const assetsPath = path.resolve(".", "tests", "assets");
