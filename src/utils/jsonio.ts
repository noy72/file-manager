import * as fs from 'fs';
import { Data } from '../models/data';

const read = (path: string): any => JSON.parse(fs.readFileSync(path).toString());

const write = (path: string, json: object): void => fs.writeFileSync(path, JSON.stringify(json));

const readDataJson = (): Data => read('data.json');

const writeDataJson = (obj: object): void => write('data.json', obj);

export { readDataJson as read, writeDataJson as write };
