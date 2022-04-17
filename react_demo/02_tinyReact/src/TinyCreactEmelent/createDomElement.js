import updateElementNode from "./updateElementNode";
import mountElement from "./mountElement";
export const createDomElement = (virtualDom) => {
    // 先判断是不是文本节点
    let dom = null;
    if (virtualDom.type === "text") {
        dom = document.createTextNode(virtualDom.props.textContent);
    } else {
        // 是一个元素节点
        dom = document.createElement(virtualDom.type);
        updateElementNode(virtualDom, dom);
    }
    // 保存虚拟dom到创建的元素
    dom._virtualDom = virtualDom;

    //   处理当前节点的子节点
    virtualDom.children.forEach((child) => {
        // virtualDom有可能是一个函数组件或者类组件，所以不能使用dom.appendChild(childNode);
        mountElement(child, dom);
    });

    if (virtualDom.props && virtualDom.props.ref) {
        virtualDom.props.ref(dom);
    }
    return dom;
};
