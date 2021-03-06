import * as assert from "assert";
import { isDotFile, isImageFile, isVideoFile } from "../../../src/domain/service/file";

it('isImageFile', () => {
    for (const fileName of ["", ".mp3", "png.mp3", "a.png.mov", ".png", "png", "./"]) {
        assert.strictEqual(isImageFile(fileName), false);
    }
    for (const fileName of ["a.png", "b.jpeg", "a.mov.jpg"]) {
        assert.strictEqual(isImageFile(fileName), true);
    }
});

it('isVideoFile', () => {
    for (const fileName of ["", ".mp3", "mp4.mp3", "a.mov.png", ".mp4", "mp4", "./"]) {
        assert.strictEqual(isVideoFile(fileName), false);
    }
    for (const fileName of ["a.mp4", "b.avi", "a.png.mov", "/path/to/isVideo.mov"]) {
        assert.strictEqual(isVideoFile(fileName), true);
    }
});

it('isDotFile', () => {
    for (const fileName of ["", "a.mp3", "mp4.mp3", "a.mov.jpeg", "mp4", "./"]) {
        assert.strictEqual(isDotFile(fileName), false);
    }
    for (const fileName of [".a.mp4", ".avi", ".png.mov"]) {
        assert.strictEqual(isDotFile(fileName), true);
    }
});