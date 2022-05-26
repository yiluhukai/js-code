import updateElementNode from "./updateElementNode";
const createDOMElement = (virtualDom) => {
    // 先判断是不是文本节点
    let dom = null;
    if (virtualDom.type === "text") {
        dom = document.createTextNode(virtualDom.props.textContent);
    } else {
        // 是一个元素节点
        dom = document.createElement(virtualDom.type);
        updateElementNode(virtualDom, dom);
    }
    return dom;
};

export default createDOMElement;
