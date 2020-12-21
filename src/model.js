module.exports = class ItemInfo {
    constructor(tags = [], type = "", thumbnail = "") {
        this.tags = tags;
        this.type = type;
        this.thumbnail = thumbnail;
    }
};
