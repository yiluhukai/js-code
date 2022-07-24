import React, { render, Component } from "./react";
const jsx = (
    <div>
        <p>Hello world!</p>
        <h1>subling</h1>
    </div>
);

// console.log(jsx);

const root = document.getElementById("root");

render(jsx, root);

setTimeout(() => {
    render(
        <div>
            {/* <div>奥利给</div> */}
            <h1>subling</h1>
        </div>,
        root
    );
}, 2000);

class MyComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div> Hello,{this.props.name}!</div>;
    }
}
// function MyComponent(props) {
//     return <div> Hello,{props.name}!</div>;
// }

// render(<MyComponent name="zce" />, root);
