import { accessSync } from "fs";

const exists = (location: string) => {
    try {
        accessSync(location);
        return true;
    } catch (error) {
        return false;
    }
}

export { exists };