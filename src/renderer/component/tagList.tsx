
import React, { RefObject } from "react";
import { Form } from "semantic-ui-react";
import { Tags } from "../../types";

const TagList = ({ tags }: { tags: Tags }) => <>
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
