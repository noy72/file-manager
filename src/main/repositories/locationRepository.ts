import * as db from '../infrastructure/database';

const getRootLocations = (): string[] => db.getLocations();

export { getRootLocations };