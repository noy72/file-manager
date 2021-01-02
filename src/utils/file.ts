const imageFileExts = [
    "png",
    "jpg",
    "jpeg",
];

const isImageFile = (fileName: string) => imageFileExts.some(ext => fileName.includes(ext));

export {isImageFile};
