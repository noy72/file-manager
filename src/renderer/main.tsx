import React from "react";
import { render } from "react-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import Top from "./page/Top";
import Content from "./page/Content";
import '../static/index.css';

const content = document.getElementById("content");
render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/content/:id" element={<Content />} />
        </Routes>
    </HashRouter>,
    content
);