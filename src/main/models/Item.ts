export interface Data {
    locations: string[];
    commands: { [index: string]: string[] };
    tags: { [index: string]: string[] };
    items: Item[];
}
export interface Item {
    location: string;
    tags: string[];
    thumbnail: string;
    updatedAt: string;

    thumbnailPath: () => string;
    open: () => void;
    isDir: () => boolean;
}
