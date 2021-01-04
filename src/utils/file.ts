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
    "webm"
];

const isVideoFile = (fileName: string): boolean => videoFileExts.some(ext => fileName.includes(ext));


export {isImageFile, isVideoFile};
