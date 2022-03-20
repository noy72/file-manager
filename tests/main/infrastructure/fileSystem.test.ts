import path from "path";
import {
    exist,
    getEncodedImage,
    recursiveReaddir,
} from "../../../src/main/infrastructure/fileSystem";
import { assetsPath } from "../../utils";

const loc = (name: string) => path.join(assetsPath, "sample_dir", name);

test("recursiveReaddir", () => {
    const files = recursiveReaddir(loc("dir01")).map(file =>
        path.basename(file)
    );
    expect(files).toEqual([
        ".DS_Store",
        ".dot.txt",
        "img01.png",
        "img02.jpeg",
        "img03.jpg",
        "img04.gif",
        "tmg01.webp",
    ]);
});

test("getEncodedImage", () => {
    const location = path.join(assetsPath, "sample_dir", "dir01", "img01.png");
    expect(getEncodedImage(location).length).toBe(3344);
});

test("exist", () => {
    const valid = path.join(assetsPath, "sample_dir", "dir01", "img01.png");
    expect(exist(valid)).toBeTruthy();
    expect(exist("invalid/path")).toBeFalsy();
});
