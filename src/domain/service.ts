import { readdirSync } from "fs";
import { join, basename } from "path";
import { Item } from "../models/Item";
import { addItems, classify, getItems } from "../repositories/itemRepository";
import { getRootLocations } from "../repositories/locationRepository";
import { isDotFile } from "./file";


const parseTagString = (str: string): string[] => {
    const word = str.split(':');
    if (word.length > 2) {
        throw new Error("コロンが2つ以上含まれています．");
    }
    return word.length == 2 ? word : ['Prop', word[0]];
}

export { parseTagString };
