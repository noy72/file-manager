import React from "react";
import { render } from "react-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import Top from "./page/Top";

const content = document.getElementById("content");
render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Top />} />
        </Routes>
    </HashRouter>,
    content
);