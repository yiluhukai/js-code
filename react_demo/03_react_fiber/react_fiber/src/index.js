import React, { render } from "./react";
const jsx = (
    <div>
        <p>Hello wolrd!</p>
        <h1>subling</h1>
    </div>
);

console.log(jsx);

const root = document.getElementById("root");

render(jsx, root);
