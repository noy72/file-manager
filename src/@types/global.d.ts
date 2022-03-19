import { ItemForRenderer, ItemForRendererWithGroupedTags, LocalItem } from "../types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: (query: string) => Promise<ItemForRenderer[]>;
    getItem: (id: string) => Promise<ItemForRendererWithGroupedTags>;
    getLocalItems: (id: string) => Promose<LocalItem[]>;
    getTags: () => Promose<Tags>;
    open: (location: string) => Promise<void>;
}
