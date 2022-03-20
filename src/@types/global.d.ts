import {
    ItemForRenderer,
    ItemForRendererWithGroupedTags,
    LocalItem,
    Tags,
} from "../types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: (query: string) => Promise<ItemForRenderer[]>;
    getItem: (id: string) => Promise<ItemForRendererWithGroupedTags>;
    getLocalItems: (id: string) => Promise<LocalItem[]>;
    getTags: () => Promise<Tags>;
    updateOpenedAtById: (id: string) => Promise<void>;
    addItemTag: (id: string, group: string, name: string) => Promise<Tags>;
    open: (location: string) => Promise<void>;
}
