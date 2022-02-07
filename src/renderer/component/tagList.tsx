
import React, { RefObject } from "react";
import { Form } from "semantic-ui-react";
import { Tags } from "../../types";

const TagList = (tags: Tags) =>
    Object.entries(tags).map(([key, values]) => {
        return <>
            <h2>{key}</h2>
            {values.map(value => <span>{value}</span>)}
        </>
    })

export default TagList;
