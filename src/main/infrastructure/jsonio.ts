import * as fs from 'fs';
import { copyFileSync } from 'fs';
import { Data } from '../models/Item';

const read = (path: string): Data => JSON.parse(fs.readFileSync(path).toString());

const write = (path: string, json: Data): void => fs.writeFileSync(path, JSON.stringify(json));

const readDataJson = (): Data => read('data.json');

const writeDataJson = (obj: Data): void => write('data.json', obj);

const rollback = (): void => copyFileSync('data.backup.json', 'data.json');

export { readDataJson as read, writeDataJson as write, rollback };
