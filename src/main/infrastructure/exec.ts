import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { ContentType } from "../../types";
import { getCommands } from "./lowdb";

export const execCommand = (
    type: ContentType,
    location: string
): ChildProcessWithoutNullStreams => {
    const [command, ...args] = getCommands()[type];
    return spawn(command, [...args, location]);
};
