import React, { ChangeEvent, RefObject } from "react";

type Props = {
    options: [string, string][],
    ref: RefObject<HTMLSelectElement>
} & JSX.IntrinsicElements["select"];

export default React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
    const className = props.className ? props.className.split(" ") : [];
    return (
        <select ref={ref} onChange={props.onChange} className={["ui", "selection", "dropdown", ...className].join(" ")} style={props.style} >
            {props.options.map(([value, text]) =>
                // 最も上の option タグは selected = true にする
                <option value={value} selected={value == props.options[0][0]} >{text}</option>)}
        </select>
    )
});