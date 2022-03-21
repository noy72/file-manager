import { ItemForRenderer } from "../../types";

type CompareNumber = 0 | -1 | 1;

const compare = (
    a: ItemForRenderer,
    b: ItemForRenderer,
    key: keyof ItemForRenderer,
    desc: boolean,
    convertFunc: (a: unknown) => unknown
): CompareNumber => {
    // TODO: 型を直す。ItemForRenderer は Date 型があるが、JSON の戻り値に Date はない。
    const x = convertFunc(a[key]);
    const y = convertFunc(b[key]);
    return x == y ? 0 : (desc ? x > y : x < y) ? -1 : 1;
};

const wrapper = (
    key: keyof ItemForRenderer,
    desc: boolean,
    convertFunc: (a: unknown) => unknown = a => a
): ((a: ItemForRenderer, b: ItemForRenderer) => CompareNumber) => {
    return (a: ItemForRenderer, b: ItemForRenderer) =>
        compare(a, b, key, desc, convertFunc);
};

const stringToDate = (date: Date): number => {
    try {
        return new Date(date).getTime();
    } catch {
        throw Error(`${date} must be Date string`);
    }
};

export const itemOrders: {
    [index: string]: (a: ItemForRenderer, b: ItemForRenderer) => CompareNumber;
} = {
    最近見た順: wrapper("openedAt", true, stringToDate),
    最後に見た順: wrapper("openedAt", false, stringToDate),
    "タイトル（降順）": wrapper("name", true),
    "タイトル（昇順）": wrapper("name", false),
    "作成日（降順）": wrapper("createdAt", false, stringToDate),
    "作成日（昇順）": wrapper("createdAt", false, stringToDate),
};

export const itemOrderOptions = Object.keys(itemOrders).map(key => ({
    key,
    value: key,
    text: key,
}));
