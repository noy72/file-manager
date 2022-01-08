import { ItemWithExistance } from "../types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: () => Promise<ItemWithExistance[]>;
}
