import { execCommand } from "../infrastructure/exec";
import { getItemByLocation } from "../infrastructure/lowdb";
import { specifyContentType } from "./item";

export const open = (location: string): void => {
    const item = getItemByLocation(location);
    if (item) {
        execCommand(item.type, item.location);
    } else {
        const type = specifyContentType(location);
        execCommand(type, location);
    }
};
