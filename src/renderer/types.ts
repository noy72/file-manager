import { Item } from "../types";

export type ItemWithExistance = Item & {
    exist: boolean
};
