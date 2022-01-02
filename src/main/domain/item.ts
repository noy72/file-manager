import path from "path";
import { readdirSync, statSync } from "fs";
import { ContentType } from "../../types";

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

export const recursiveReaddir = (location: string): string[] => {
    const fileOrDir = readdirSync(location);
    const files: string[] = [];
    fileOrDir.forEach(name => {
        const fullpath = path.join(location, name);
        if (statSync(fullpath).isDirectory()) {
            files.push(...recursiveReaddir(fullpath));
        } else {
            files.push(fullpath);
        }
    });
    return files;
}
