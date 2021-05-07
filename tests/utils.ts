import { writeFileSync } from "fs";
import rootpath from "../rootpath";

export const sampleDirPath = rootpath('/tests/sample_dir');

export const resetDataJson = () => {
    const data = {
        "locations": [rootpath("tests/sample_dir")],
        "commands": {
            "directory": ["cp", rootpath("tests/renderer/tmp_files/directory.txt")],
            "images": ["cp", rootpath("tests/renderer/tmp_files/images.txt")],
            "video": ["open"]
        },
        "tags": {
            "group_1": ["1"],
            "group_2": ["a"],
            "日本語タグ": ["タグ"]
        },
        "items": [{
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir01",
            "tags": ["1"],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir01/code01.png",
            "updatedAt": "Sun Mar 21 2021 17:03:17 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/not_exists",
            "tags": [],
            "thumbnail": "",
            "updatedAt": "Sun Mar 21 2021 17:03:17 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/sample.mov",
            "tags": ["1"],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/.thumbnails/sample.mov.jpg",
            "thumbnailTime": "00:00:00",
            "updatedAt": "Sun Mar 21 2021 17:03:17 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir02",
            "tags": [],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir02/grey.png",
            "updatedAt": "Thu Apr 29 2000 05:08:30 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir03",
            "tags": [],
            "thumbnail": "images/no_image.jpeg",
            "updatedAt": "Thu Apr 29 2021 05:08:30 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir04",
            "tags": [],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir04/grey.png",
            "updatedAt": "Thu Apr 29 2021 05:08:30 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir05",
            "tags": [],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir05/code02.png",
            "updatedAt": "Thu Apr 29 2100 05:08:30 GMT+0900 (Japan Standard Time)"
        }, {
            "location": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir06",
            "tags": [],
            "thumbnail": "/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir06/grey.png",
            "updatedAt": "Thu Apr 29 2021 05:08:30 GMT+0900 (Japan Standard Time)"
        }
        ]
    }
    writeFileSync(rootpath('tests/data/data.json'), JSON.stringify(data));
};
