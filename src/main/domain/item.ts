import path from "path";
import { v4 } from 'uuid';
import { statSync, readdirSync } from "fs";
import { ContentType, Item, ItemForRenderer, ItemForRendererWithGroupedTags, LocalItem, ParsedQuery, Tags } from "../../types";
import {
    getEncodedImage,
    recursiveReaddir,
    exist,
} from "../infrastructure/fileSystem";
import { addItems, getItemById, getItems, getLocations, getTags } from "../infrastructure/lowdb";

export const extTypes = {
    image: [".gif", ".jpg", ".jpeg", ".png", ".webp"],
    video: [".avi", ".mp4", ".mov", ".wmv"],
};

export const specifyContentType = (location: string): ContentType => {
    const stat = statSync(location);
    if (stat.isDirectory()) {
        const files = recursiveReaddir(location);
        const exts = files
            .filter(file => path.basename(file)[0] !== ".")
            .map(file => path.extname(file));
        if (exts.every(ext => extTypes.image.includes(ext))) {
            return "images";
        }
        if (exts.every(ext => extTypes.video.includes(ext))) {
            return "videos";
        }
        return "other";
    }

    const ext = path.extname(location);
    if (extTypes.image.includes(ext)) return "image";
    if (extTypes.video.includes(ext)) return "video";

    return "other";
};

export const getItemsForRenderer = (query = ""): ItemForRenderer[] =>
    filterItems(getItems().map(itemToItemForRenderer), query);

export const filterItems = (items: ItemForRenderer[], query: string): ItemForRenderer[] => {
    const parsedQuery = parseQuery(query);
    return items
        .filter(item => parsedQuery['complete']['title']
            .every(title => item.name === title))
        .filter(item => parsedQuery['complete']['tag']
            .every(tag => item.tags.includes(tag)))
        .filter(item => parsedQuery['part']['title']
            .every(title => item.name.includes(title)))
        .filter(item => parsedQuery['part']['tag']
            .every(tag => item.tags.some(attachedTag => attachedTag.includes(tag))));
};

export const parseQuery = (query: string): ParsedQuery => {
    const result: ParsedQuery = {
        complete: {
            tag: [],
            title: [],
        },
        part: {
            tag: [],
            title: [],
        }
    };
    let isTag = false;
    let enclose = 0;
    let word = "";
    for (const c of `${query} `) {
        if (c === "\"") {
            enclose += 1;
        } else if (c === "#") {
            isTag = true;
        } else if (c === " " && enclose !== 1) {
            result[enclose === 2 ? "complete" : "part"][isTag ? "tag" : "title"].push(word);
            word = "";
            enclose = 0;
            isTag = false;
        } else {
            word += c;
        }
    }
    return result;
}


export const getItemForRendererWithGroupdedTags = (id: string): ItemForRendererWithGroupedTags => {
    const item = getItemById(id);
    if (!item) throw Error(`id: ${id} not found.`);
    const itemForRenderer = itemToItemForRenderer(item);

    const allTags = getTags();
    const groupedTags: Tags = {};
    for (const [group, tags] of Object.entries(allTags)) {
        const tagSet = new Set(tags);
        for (const attachedTag of itemForRenderer.tags) {
            if (!tagSet.has(attachedTag)) continue;
            if (groupedTags[group] === undefined) groupedTags[group] = [];
            groupedTags[group].push(attachedTag);
        }
    }
    return {
        ...itemForRenderer,
        tags: groupedTags
    }
};

const itemToItemForRenderer = (item: Item): ItemForRenderer => {
    const existThumbnail = exist(item.thumbnail);
    return {
        ...item,
        exist: exist(item.location),
        name: path.basename(item.location),
        encodedThumbnail: existThumbnail
            ? getEncodedImage(item.thumbnail)
            : "TODO",
        thumbnailExt: existThumbnail
            ? path.extname(item.thumbnail)
            : "TODO",
    };
}

export const syncItemsFromLocations = (): void => {
    const existItemLocations = new Set(getItems().map(item => item.location));

    const newItems = getLocations().flatMap(parentLoc => {
        const names = readdirSync(parentLoc);
        const childLocs = names.map(name => path.join(parentLoc, name));
        return childLocs
            .filter(childLoc => !existItemLocations.has(childLoc))
            .map(newChildLoc => createItem(newChildLoc));
    });
    addItems(newItems);
};

const createItem = (location: string): Item => {
    const now = new Date();
    return {
        id: v4(),
        location,
        thumbnail: getThumbnail(location),
        tags: [],
        createdAt: now,
        updatedAt: now,
        type: specifyContentType(location),
    };
};

const getThumbnail = (location: string) => {
    if (statSync(location).isDirectory()) {
        const files = readdirSync(location);
        const images = files.filter(file =>
            extTypes.image.includes(path.extname(file))
        );
        if (images.length === 0) return "TODO";
        return path.join(location, images.sort()[0]);
    }
    return "TODO";
};

export const getLocalItems = (id: string): LocalItem[] => {
    const item = getItemById(id);
    return readdirSync(item.location)
        .filter(name => name[0] !== '.')
        .map(name => ({ location: item.location.concat('/', name), name }))
        .sort((a, b) => {
            const x = a.name;
            const y = b.name;
            return x == y ? 0 : (x < y ? -1 : 1);
        });
}