import React, { ChangeEvent } from "react";
import { ItemOrder } from "../../../main/domain/service/item";

export default ({ options, onChange }: { options: [ItemOrder, string][], onChange: (e: ChangeEvent<HTMLSelectElement>) => void }) => (
    <select onChange={onChange} className="ui selection dropdown" style={{ marginBottom: "2rem" }}>
        {options.map(([value, text]) =>
            <option value={value}>{text}</option>)}
    </select>
);