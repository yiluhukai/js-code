import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementNode from "./updateElementNode";
const diff = (virtualDom, container, oldDom) => {
    // 先只考虑oldDom不存在的情况(第一次挂载)
    const oldVirtualDom = oldDom && oldDom._virtualDom;
    if (!oldDom) {
        mountElement(virtualDom, container);
    } else if (oldVirtualDom && oldVirtualDom.type === virtualDom.type) {
        // oldDom存在且和新的dom的type相同
        if (oldVirtualDom.type === "text") {
            // 文本节点
            updateTextNode(virtualDom, oldVirtualDom, oldDom);
        } else {
            // 元素节点，对比去更新元素节点的属性
            updateElementNode(virtualDom, oldDom, oldVirtualDom);
        }
        // 对当前节点的字节点我们需要进行递归
        virtualDom.props.children.forEach((child, i) => {
            diff(child, oldDom, oldDom.childNodes[i]);
        });
    }
};

export default diff;
