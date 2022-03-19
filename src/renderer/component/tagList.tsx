
import React from "react";
import { Label } from "semantic-ui-react";
import { Tags } from "../../types";
import { Link } from "react-router-dom";

const TagList = ({ tags }: { tags: Tags }): JSX.Element => <>
    {
        Object.entries(tags).map(([key, values]) =>
            <>
                <h3 key={key}>{key}</h3>
                {
                    values.map(value =>
                        <Label key={`${key}-${value}`} as={Link} basic size="small" to={{
                            pathname: "/",
                            search: '?search='.concat(`%23"${value}"`),
                        }}>{value}</Label>
                    )
                }
            </>
        )
    }
</>

export default TagList;
