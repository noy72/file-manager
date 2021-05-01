import { spawn } from 'child_process';
import { basename, dirname, join } from 'path';
import { Item } from "./Item";
import { getCommand } from "../infrastructure/config";
import { exists } from "../infrastructure/file";
import { mkdir, mkdirSync } from 'fs';
import { isTemplateExpression } from 'typescript';

export default class Video implements Item {
    static command: string[] = getCommand("video");

    location: string = '';
    tags: string[] = [];
    thumbnail: string = '';
    thumbnailTime: string = '00:00:00';
    updatedAt: string = '';

    constructor(value: string | Item) {
        if (typeof value === "string") {
            this.location = value;
            this.thumbnail = join(dirname(value), '.thumbnails', `${basename(this.location)}.jpg`);
            this.updatedAt = Date();
        } else {
            const video = <Video>value;
            this.location = video.location;
            this.tags = video.tags;
            this.thumbnail = video.thumbnail;
            this.thumbnailTime = video.thumbnailTime;
            this.updatedAt = video.updatedAt;
        }
        mkdirSync(join(dirname(this.location), ".thumbnails"), { recursive: true });
        if (!exists(this.thumbnail)) {
            this.makeThumbnail();
        }
    }

    /**サムネイルを作成する */
    private makeThumbnail(): void {
        const command = join(process.cwd(),
            process.platform === "darwin" ? "ffmpeg" : "ffmpeg.exe"
        );
        spawn(command, ["-i", this.location, "-ss", this.thumbnailTime, "-vframes", "1", this.thumbnail]);
    }

    public thumbnailPath(): string {
        return this.thumbnail;
    }

    public open(): void {
        const [com, ...args] = Video.command;
        spawn(com, [...args, this.location]);
    }

    public isDir(): boolean {
        return false;
    }
}

