
import React from "react";
import { Tags } from "../../types";

const TagList = ({ tags }: { tags: Tags }): JSX.Element => <>
    {
        Object.entries(tags).map(([key, values]) =>
            <>
                <h2 key={key}>{key}</h2>
                {
                    values.map(value =>
                        <span key={`${key}-${value}`}>{value}</span>
                    )
                }
            </>
        )
    }
</>

export default TagList;
