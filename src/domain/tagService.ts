const parseTagString = (str: string): string[] => {
    const word = str.split(':');
    return word.length == 2 ? word : ['Prop', word[0]];
}

const isValidTagString = (str: string): boolean => str.split(":").length <= 2;

export { isValidTagString, parseTagString };
