const imageFileExts = [
    "png",
    "jpg",
    "jpeg",
];

exports.isImageFile = (fileName: string) => imageFileExts.some(ext => fileName.includes(ext));
