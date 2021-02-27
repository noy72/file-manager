import { readdirSync } from "fs";
import { isImageFile } from "../utils/file";
import Item from "./Item";

export default class Directory implements Item {
    static TYPES = {
        other: 0,
        images: 1
    } as const;

    location: string = '';
    tags: string[] = [];
    type: number = -1;
    thumbnail: string = '';
    updatedAt: string = '';

    constructor(location?: string) {
        if (typeof location === "string") {
            this.init(location);
        }
    }

    init(location: string) {
        this.location = location;
        this.setImageFileNameWithSmallestName();
        this.setType();
        this.updatedAt = Date();
    }

    setImageFileNameWithSmallestName(): void {
        this.thumbnail = readdirSync(this.location)
            .filter((fileName: string) => isImageFile(fileName))
            .sort()[0];
    }

    setType(): void {
        const files = readdirSync(this.location);
        if (files.every((fileName: string) => isImageFile(fileName))) {
            this.type = Directory.TYPES.images;
        } else {
            this.type = Directory.TYPES.other;
        }
    }
}


