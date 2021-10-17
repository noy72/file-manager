import React, { MouseEvent } from "react";

type Props = {
    current: number;
    pageSize: number;
    createOnClick: (page: number) => (e: MouseEvent<HTMLAnchorElement>) => void;
};

const Pagination = ({ current, pageSize, createOnClick }: Props): React.ReactElement => {
    const item = (num: number, disabled: boolean): React.ReactElement =>
        <a className={[disabled ? "disabled" : "", "item"].join(' ')} onClick={createOnClick(num)} >{num + 1}</a>;

    return <div className="ui pagination menu">
        {pageNumbers(current, pageSize).map(num => num === -1 ? dotItem() : item(num, num === current))}
    </div>;
};

const dotItem = (): React.ReactElement => (
    <div className="disabled item">
        ...
    </div>
);

/**
 * Return pagication numbers.  * -1 mean dot item.
 * Max length of return values is 9.
 * @param current
 * @param pageSize
 * @returns
 */
const pageNumbers = (current: number, pageSize: number) => {
    const nums: number[] = [];
    if (current < 6) {
        for (let i = 0; i <= current; i++) nums.push(i);
    } else {
        nums.push(0, -1, current - 2, current - 1, current);
    }

    const rightCount = pageSize - current - 1;
    if (rightCount <= 4) {
        for (let i = current + 1; i < pageSize; i++) nums.push(i);
    } else {
        nums.push(current + 1, current + 2, -1, pageSize - 1);
    }
    console.log(nums);

    return nums;
};

export default Pagination;