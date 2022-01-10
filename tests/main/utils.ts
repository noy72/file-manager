import { Item } from "../../src/main/models/Item";


const createItem = (location: string, tags: string[]): Item => ({
    location: location,
    tags: tags,
    updatedAt: location.length.toString(),
    thumbnail: "",
    isDir: () => false,
    thumbnailPath: () => "",
    open: () => "",
});

export { createItem };