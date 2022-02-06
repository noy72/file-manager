import React from "react";
import { render } from "react-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import Content from "./page/renderer";

const content = document.getElementById("content");
render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Content />} />
        </Routes>
    </HashRouter>,
    content
);