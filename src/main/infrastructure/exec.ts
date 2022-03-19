import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { ContentType } from "../../types";
import { getCommands } from "./lowdb";

export const execCommand = (
    type: ContentType,
    location: string
): ChildProcessWithoutNullStreams => {
    console.log(type, location)
    if (type === 'exe') {
        return spawn(location)
    }

    const [command, ...args] = getCommands()[type];
    console.log(command, args, location)
    return spawn(command, [...args, location]);
};
