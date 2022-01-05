import path from 'path';
import { recursiveReaddir } from '../../../src/main/infrastructure/fileSystem';
import { assetsPath } from '../../utils';

const loc = (name: string) => path.join(assetsPath, "sample_dir", name);

test('recursiveReaddir', () => {
    const files = recursiveReaddir(loc('dir01')).map(file => path.basename(file));
    expect(files).toEqual([
        '.dot.txt',
        'img01.png',
        'img02.jpeg',
        'img03.jpg',
        'img04.gif',
        'tmg01.webp'
    ]);
});
