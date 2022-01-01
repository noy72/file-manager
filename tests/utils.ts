import { Data, Item } from "../src/types";
import uuid from 'uuid';

export const createData = (): Data => ({
    locations: [
        "/path/1",
        "/path/2",
    ],
    commands: {
        "com1": ["a", "b", "c"],
        "com2": ["1", "2"],
    },
    tags: {
        "group1": ["aa"],
        "group2": ["xx"]
    },
    items: []
});


export const createItem = (item: any = {}): Item => ({
    location: uuid.v4(),
    tags: [],
    thumbnail: "/path/to/thumbnail",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'other',
    ...item,
});
