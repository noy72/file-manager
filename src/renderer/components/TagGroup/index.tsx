import React, { ChangeEvent } from "react";

type ClassifiedTags = { [index: string]: string[] };
type Handler = (e: ChangeEvent<HTMLInputElement>) => void;
export default ({ classifiedTags, checkedTags, handler }: { classifiedTags: ClassifiedTags, checkedTags: string[], handler: Handler }) => (
    <div id="tags">
        {Object.entries(classifiedTags)
            .map(([groupName, tags]) => (<>
                <div>
                    <h2>{groupName}</h2>
                    <div className="ui form">
                        <div className="inline fields">
                            {tags.map(tag =>
                                <TagCheckBox checked={checkedTags.includes(tag)} name={tag} handler={handler} />
                            )}
                        </div>
                    </div>
                </div>
                <hr />
            </>))}
    </div>
);

const TagCheckBox = ({ checked, name, handler }: { checked: boolean, name: string, handler: Handler }) => (
    <div className={["ui", checked ? "checked" : "", "checkbox"].join(" ")} >
        <input onChange={handler} type="checkbox" defaultChecked={checked} className="tag" id={name} value={name} />
        <label htmlFor={name}>{name}</label>
    </div>
);