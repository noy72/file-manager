import { basename, extname } from "path";

const imageFileExts = [
    ".png",
    ".jpg",
    ".jpeg",
];

const isImageFile = (fileName: string): boolean => imageFileExts.includes(extname(fileName));

const videoFileExts = [
    ".avi",
    ".wmv",
    ".flv",
    ".mpeg",
    ".mp4",
    ".wmv",
    ".webm",
    ".mov"
];

const isVideoFile = (fileName: string): boolean => videoFileExts.includes(extname(fileName));

const isDotFile = (fileName: string): boolean => basename(fileName).length > 1 && basename(fileName)[0] === ".";

export { isImageFile, isVideoFile, isDotFile };
