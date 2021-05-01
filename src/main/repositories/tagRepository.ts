import * as db from "../infrastructure/database";

const getTags = () => db.getTags();

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