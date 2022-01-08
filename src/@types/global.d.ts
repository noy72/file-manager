import { ItemWithExistance } from "src/types";

declare global {
    interface Window {
        api: API;
    }
}

export interface API {
    getItems: () => Promise<ItemWithExistance[]>;
}
