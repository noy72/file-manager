import Item from "./Item";

export interface Data {
    locations: string[];
    applications: Application[];
    tags: Tags;
    items: Item[];
}

export interface Application {
    command: string;
    args: string[];
}

export interface Tags {
    [index: string]: string[]
}
