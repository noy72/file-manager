export const CHANNELS = {
    GET_ITEMS: "getItems",
    GET_ITEM: "getItem",
    GET_LOCAL_ITEMS: "getLocalItems",
    GET_TAGS: "tags",
    ADD_TEIM_TAG: "addItemTag",
    UPDATE_OPENED_AT: "updateOpenedAt",
    OPEN: "open",
    POPUP_ITEM_CARD_MENU: "popupItemCardMenu",
} as const;

export type CHANNELS = typeof CHANNELS[keyof typeof CHANNELS];

export const PAGE_SIZE = 30;
