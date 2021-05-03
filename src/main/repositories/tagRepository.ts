import * as db from "../infrastructure/database";

const getTags = () => {
    const tagGroups = db.getTags();
    const sortedTagGroups: { [name: string]: string[] } = {};
    Object.entries(tagGroups).forEach(([name, tags]) => {
        sortedTagGroups[name] = tags.sort();
    });
    return sortedTagGroups;
};

const updateTags = (group: string, tag: string): void => {
    const tags = getTags();
    if (!Object.keys(tags).includes(group)) {
        tags[group] = [];
    }
    if (tags[group].includes(tag)) return;
    tags[group].push(tag);
    db.updateTags(tags);
};

export { getTags, updateTags };