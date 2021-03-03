import { basename } from "path";

const imageFileExts = [
    "png",
    "jpg",
    "jpeg",
];

const isImageFile = (fileName: string): boolean => imageFileExts.some(ext => fileName.includes(ext));

const videoFileExts = [
    "avi",
    "wmv",
    "flv",
    "mpeg",
    "mp4",
    "wmv",
    "webm",
    "mov"
];

const isVideoFile = (fileName: string): boolean => videoFileExts.some(ext => fileName.includes(ext));

const isDotFile = (fileName: string): boolean => basename(fileName)[0] === ".";

export { isImageFile, isVideoFile, isDotFile };
