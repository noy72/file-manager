
import { getDatabaseLocation } from '../../../src/main/infrastructure/sql';
import { jest } from '@jest/globals';

jest.useFakeTimers();

test('getDatabaseLocation', () => {
    const platform = getDatabaseLocation();
    console.log(platform);
});
