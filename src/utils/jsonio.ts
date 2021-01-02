import * as fs from 'fs';

const read = (path: string) => JSON.parse(fs.readFileSync(path).toString());

const write = (path: string, json: object) => fs.writeFileSync(path, JSON.stringify(json));

export {read, write};
