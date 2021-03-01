import { spawn } from "child_process";
import { read } from "../utils/jsonio";
import Directory from "./Directory";

export default class Images extends Directory {
    static command: string[] = read().commands["images"];

    public open(): void {
        const [com, ...args] = Images.command;
        spawn(com, [...args, this.location]);
    }
}


