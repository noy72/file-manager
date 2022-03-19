export const CHANNELS = {
    GET_ITEMS: "getItems",
    GET_ITEM: "getItem",
    GET_LOCAL_ITEMS: "getLocalItems",
    GET_TAGS: "tags",
    OPEN: "open",
} as const;

export type CHANNELS = typeof CHANNELS[keyof typeof CHANNELS];


