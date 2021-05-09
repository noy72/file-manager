import React, { ForwardedRef, ForwardRefRenderFunction } from "react";

type Props = {
    options: [string, string][],
} & JSX.IntrinsicElements["select"];

const element: ForwardRefRenderFunction<HTMLSelectElement, Props> = ({ className, onChange, style, options }: Props, ref: ForwardedRef<HTMLSelectElement>) => {
    const classNames = className ? className.split(" ") : [];
    return (
        <select ref={ref} onChange={onChange} className={["ui", "selection", "dropdown", ...classNames].join(" ")} style={style} >
            {options.map(([value, text]) =>
                // 最も上の option タグは selected = true にする
                <option key={value} value={value} selected={value == options[0][0]} >{text}</option>)}
        </select>
    );
};

const Selector = React.forwardRef<HTMLSelectElement, Props>(element);

export default Selector;