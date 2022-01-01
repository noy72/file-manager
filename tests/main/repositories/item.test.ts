import { splitQuery } from '../../../src/main/repositories/item';

test('splitQuery', () => {
    const words = splitQuery('abc "a b c" #xyz #"x y z"');
    expect(words).toEqual([
        {
            word: "abc",
            perfectMatch: false,
            isTag: false,
        },
        {
            word: "a b c",
            perfectMatch: true,
            isTag: false,
        },
        {
            word: "xyz",
            perfectMatch: false,
            isTag: true,
        },
        {
            word: "x y z",
            perfectMatch: true,
            isTag: true,
        },
    ]);
});

test('filterItems', () => {

});