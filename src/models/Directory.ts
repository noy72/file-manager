import { readdirSync } from "fs";
import { spawn } from 'child_process';
import { Item } from "./Item";
import { getCommand } from "../infrastructure/config";
import { isImageFile } from "../domain/service/file";
import { join } from "path";

export default class Directory implements Item {
    static command: string[] = getCommand("directory");

    location: string = '';
    tags: string[] = [];
    thumbnail: string = '';
    updatedAt: string = '';

    constructor(value: string | Item) {
        if (typeof value === "string") {
            this.location = value;
            this.setThumbnail();
            this.updatedAt = Date();
        } else {
            this.location = value.location;
            this.tags = value.tags;
            this.thumbnail = value.thumbnail;
            this.updatedAt = value.updatedAt;
        }
    }

    /**ディレクトリ内の画像のうち，最も名前の小さいものをサムネイルに設定する */
    private setThumbnail(): void {
        this.thumbnail = readdirSync(this.location)
            .filter((fileName: string) => isImageFile(fileName))
            .sort()[0];
    }

    public thumbnailPath(): string {
        return join(this.location, this.thumbnail);
    }

    public open(): void {
        const [com, ...args] = Directory.command;
        spawn(com, [...args, this.location]);
    }

    public isDir(): boolean {
        return true;
    }
}


