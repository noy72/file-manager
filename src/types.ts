export type Data = {
    locations: Locations;
    commands: Commands;
    tags: Tags;
    items: Item[];
};

export type Locations = string[];
export type Commands = {
    image: string[];
    images: string[];
    video: string[];
    videos: string[];
    other: string[];
};
export type Tags = { [index: string]: string[] };
export type Item = {
    id: string;
    location: string;
    tags: string[];
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    type: ContentType;
};
export type ItemForRenderer = Item & {
    exist: boolean;
    name: string;
    encodedThumbnail: string;
    thumbnailExt: string;
};

export type ContentType = keyof Commands;
