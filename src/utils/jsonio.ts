import * as fs from 'fs';

const read = (path: string): any => JSON.parse(fs.readFileSync(path).toString());

const write = (path: string, json: object): void => fs.writeFileSync(path, JSON.stringify(json));

const writeDataJson = (obj: object): void => write('data.json', obj);

export {read, writeDataJson as write};
