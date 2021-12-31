export type Data = {
    locations: Locations;
    commands: Commands;
    tags: Tags;
    items: Item[];
};

export type Locations = string[];
export type Commands = { [index: string]: string[] };
export type Tags = { [index: string]: string[] };
export type Item = {
    location: string;  // Primary Key
    tags: string[];
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    type: ContentType;
};

export type ContentType = 'image' | 'images' | 'other' | 'video';