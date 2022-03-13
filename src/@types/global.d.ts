import { ItemForRenderer } from "../types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: () => Promise<ItemForRenderer[]>;
    getItem: (id: string) => Promise<ItemForRendererWithGroupedTags>;
}
