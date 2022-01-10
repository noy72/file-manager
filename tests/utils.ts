import { writeFileSync } from "fs";
import rootpath from "../rootpath";

export const sampleDirPath = rootpath('/tests/sample_dir');

export const createItem = (item: any = {}): Item => {
    const v4 = uuid.v4();
    return {
        id: v4,
        location: v4,
        tags: [],
        thumbnail: `${v4}/thumbnail`,
        createdAt: new Date(),
        updatedAt: new Date(),
        type: "other",
        ...item,
    };
    writeFileSync(rootpath('tests/data/data.json'), JSON.stringify(data));
};
