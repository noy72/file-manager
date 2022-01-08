import path from "path";
import { readdirSync, readFileSync, statSync } from "fs";

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

export const getEncodedImage = (location: string): string => {
    const file = readFileSync(location);
    return file.toString('base64');
};
