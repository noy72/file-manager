import path from "path";
import { statSync, readdirSync } from "fs";
import { ContentType, Item, ItemForRenderer } from "../../types";
import { getEncodedImage, recursiveReaddir, exist } from "../infrastructure/fileSystem";
import { addItems, getItems, getLocations } from "../infrastructure/lowdb";

export const extTypes = {
    image: ['.gif', '.jpg', '.jpeg', '.png', '.webp'],
    video: ['.avi', '.mp4', '.mov', '.wmv'],
};

export const specifyContentType = (location: string): ContentType => {
    const stat = statSync(location);
    if (stat.isDirectory()) {
        const files = recursiveReaddir(location);
        const exts = files.filter(file => path.basename(file)[0] !== '.')
            .map(file => path.extname(file));
        if (exts.every(ext => extTypes.image.includes(ext))) {
            return 'images';
        }
        if (exts.every(ext => extTypes.video.includes(ext))) {
            return 'videos';
        }
        return 'other';
    }

    const ext = path.extname(location);
    if (extTypes.image.includes(ext)) return 'image';
    if (extTypes.video.includes(ext)) return 'video';

    return 'other';
}

export const getItemsForRenderer = (): ItemForRenderer[] => getItems().map(item => {
    const existThumbnail = exist(item.thumbnail);
    return {
        ...item,
        exist: exist(item.location),
        name: path.basename(item.location),
        encodedThumbnail: existThumbnail ? getEncodedImage(item.thumbnail) : 'TODO',
        thumbnailExt: existThumbnail ? path.extname(item.thumbnail) : "TODO",
    };
});

export const syncItemsFromLocations = (): void => {
    const existItemLocations = new Set(getItems().map(item => item.location));

    const newItems = getLocations().flatMap(parentLoc => {
        const names = readdirSync(parentLoc);
        const childLocs = names.map(name => path.join(parentLoc, name));
        return childLocs
            .filter(childLoc => !existItemLocations.has(childLoc))
            .map(newChildLoc => createItem(newChildLoc));
    });
    addItems(newItems);
};

const createItem = (location: string): Item => {
    const now = new Date();
    return {
        location,
        thumbnail: getThumbnail(location),
        tags: [],
        createdAt: now,
        updatedAt: now,
        type: specifyContentType(location),
    };
};

const getThumbnail = (location: string) => {
    if (statSync(location).isDirectory()) {
        const files = readdirSync(location);
        const images = files.filter(
            file => extTypes.image.includes(path.extname(file))
        );
        if (images.length === 0) return 'TODO';
        return path.join(location, images.sort()[0]);
    }
    return 'TODO';
};
