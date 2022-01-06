import path from "path";
import { accessSync, statSync } from "fs";
import { ContentType } from "../../types";
import { recursiveReaddir } from "../infrastructure/fileSystem";
import { ItemWithExistance } from "../../types";
import { getItems } from "../infrastructure/lowdb";

const extTypes = {
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

export const getItemsWithExistance = (): ItemWithExistance[] => getItems().map(item => {
    let exist = true;
    try {
        accessSync(item.location);
    } catch {
        exist = false;
    }
    return {
        ...item,
        exist
    };
});
