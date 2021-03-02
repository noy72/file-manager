import { spawn } from "child_process";
import { getCommand } from "../infrastructure/config";
import Directory from "./Directory";

export default class Images extends Directory {
    static command: string[] = getCommand("images");

    public open(): void {
        const [com, ...args] = Images.command;
        spawn(com, [...args, this.location]);
    }
}


