import path from 'path';
import { specifyContentType } from '../../../src/main/domain/item';
import { assetsPath } from '../../utils';

const loc = (name: string) => path.join(assetsPath, "sample_dir", name);

test('specifyContentType', () => {
    expect(specifyContentType(loc('dir01'))).toBe('images');
    expect(specifyContentType(loc('dir02'))).toBe('videos');
    expect(specifyContentType(loc('dir03'))).toBe('other');
    expect(specifyContentType(loc('img.jpg'))).toBe('image');
    expect(specifyContentType(loc('video.mp4'))).toBe('video');
    expect(specifyContentType(loc('text.txt'))).toBe('other');
});
