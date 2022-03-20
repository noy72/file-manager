import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { ContentType } from "../../types";
import { getCommands } from "./lowdb";

export const execCommand = (
    type: ContentType,
    location: string
): ChildProcessWithoutNullStreams => {
    if (type === 'exe') {
        return spawn(location)
    }

    const [command, ...args] = getCommands()[type];
    return spawn(command, [...args, location]);
};
