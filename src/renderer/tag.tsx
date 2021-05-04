import { remote } from "electron";
import { getItem, updateAttachedTags } from "../main/repositories/itemRepository";
import { getTags, updateTags } from "../main/repositories/tagRepository";
import { isValidTagString, parseTagString } from "../main/domain/service/tag";
import React, { ChangeEvent, FormEvent, MouseEvent, RefObject, useRef } from "react";
import ReactDOM from "react-dom";
import TagGroup from "./components/TagGroup";
import Selector from "./components/Selector";

/**現在対象にとっているitemのlocationを返す． */
const getCurrentLocation = () => process.argv[process.argv.length - 1];

const getCheckedTags = (): string[] => {
    const location = getCurrentLocation();
    const item = getItem(location);
    if (item === undefined) {
        throw new Error(`"${location}" is invalid path.`);
    }
    return item.tags
}

type State = {
    classifiedTags: { [index: string]: string[] },
    checkedTags: string[]
};

class Content extends React.Component<{}, State> {
    tagInputBoxRef: RefObject<HTMLInputElement>;
    selectorRef: RefObject<HTMLSelectElement>;

    constructor(props: {}) {
        super(props);
        this.state = {
            classifiedTags: getTags(),
            checkedTags: getCheckedTags()
        };
        this.tagInputBoxRef = React.createRef();
        this.selectorRef = React.createRef();

        this.addNewTag = this.addNewTag.bind(this);
        this.closeCurrentWindow = this.closeCurrentWindow.bind(this);
        this.tagCheckBoxChangeHandler = this.tagCheckBoxChangeHandler.bind(this);
    }


    addNewTag(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const inputNode = this.tagInputBoxRef.current!;
        if (!isValidTagString(inputNode.value)) return;

        const [group, tag] = parseTagString(inputNode.value, this.selectorRef.current!.value);
        updateTags(group, tag);
        inputNode.value = '';
        this.setState({
            classifiedTags: getTags(),
        });
    }

    closeCurrentWindow(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        updateAttachedTags(getCurrentLocation(), this.state.checkedTags);
        remote.getCurrentWindow().close();
    }

    render() {
        return <>
            <Selector options={Object.keys(this.state.classifiedTags).map(key => [key, key])} ref={this.selectorRef} style={{ marginTop: "1rem" }} />
            <form autoComplete="on" id="form">
                <div className="ui fluid icon input">
                    <input ref={this.tagInputBoxRef} type="text" placeholder="Add #tag" id="add-tag-box" required />
                    <button onClick={this.addNewTag} className="ui button" id="add-tag-button">Add</button>
                </div>
            </form>
            <form>
                <TagGroup classifiedTags={this.state.classifiedTags} checkedTags={this.state.checkedTags} handler={this.tagCheckBoxChangeHandler} />
                <button onClick={this.closeCurrentWindow} className="ui primary button" type="submit" id="submit-button">Submit</button>
            </form>
        </>;
    }

    tagCheckBoxChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const checkedTags = this.state.checkedTags;
        const tag = e.target.value;
        if (e.target.checked) {
            checkedTags.push(tag);
        } else {
            checkedTags.splice(checkedTags.indexOf(tag), 1)
        }
        this.setState({
            checkedTags: checkedTags
        });
    }

}

const content = document.getElementById('content');
ReactDOM.render(<Content />, content);

