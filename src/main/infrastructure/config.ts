import { read } from "./jsonio";

const getCommands = (): { [index: string]: string[] } => read().commands;

const getCommand = (key: string): string[] => {
    const commands = getCommands();
    if (Object.keys(commands).includes(key)) {
        return commands[key];
    }
    throw new Error(`${key} は commands に存在しません．`);
}

export { getCommand };