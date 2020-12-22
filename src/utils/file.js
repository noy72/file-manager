const imageFileExts = [
    "png",
    "jpg",
    "jpeg",
];

exports.isImageFile = (fileName) => imageFileExts.some(ext => fileName.includes(ext));
