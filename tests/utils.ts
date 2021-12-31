import { Item } from "../src/types";
import uuid from 'uuid';

export const createItem = (item: any = {}): Item => {
    return {
        location: uuid.v4(),
        tags: [],
        thumbnail: "/path/to/thumbnail",
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'other',
        ...item,
    };
};