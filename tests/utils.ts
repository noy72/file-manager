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
    const location = uuid.v4();
    return {
        location,
        tags: [],
        thumbnail: `${location}/thumbnail`,
        createdAt: new Date(),
        updatedAt: new Date(),
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
