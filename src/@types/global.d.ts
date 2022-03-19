import { ItemForRenderer } from "../types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: (query: string) => Promise<ItemForRenderer[]>;
    getItem: (id: string) => Promise<ItemForRendererWithGroupedTags>;
}
