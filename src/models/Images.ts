import { getCommands } from "../database";
import Directory from "./Directory";

export default class Images extends Directory {
    static command: string[] = getCommands()["images"];
}


