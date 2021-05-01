const parseTagString = (str: string): string[] => {
    const word = str.split(':');
    return word.length == 2 ? word : ['Prop', word[0]];
}

const isValidTagString = (str: string): boolean => {
    const words = str.split(":");
    if (words.length == 1) return true;
    if (words.length == 2 && words.every(word => word.length > 0)) return true;
    return false;
}

export { isValidTagString, parseTagString };
