
import React from "react";
import ReactDOM from "react-dom";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { Link, useParams } from "react-router-dom";

// タグ一覧、タグ入力欄、タグ入力欄にオートコンプリート
// 入力したらタグを更新する
// tag がステートになる
const Content = async () => {
    const { id } = useParams();
    const item = await window.api.getItems()

    return <>
        <p>{id}</p>
    </>;

};


export default Content;
