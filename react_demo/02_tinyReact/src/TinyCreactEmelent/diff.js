import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementNode from "./updateElementNode";
import { createDomElement } from "./createDomElement";
const diff = (virtualDom, container, oldDom) => {
    // 先只考虑oldDom不存在的情况(第一次挂载)
    const oldVirtualDom = oldDom && oldDom._virtualDom;
    if (!oldDom) {
        mountElement(virtualDom, container);
    } else if (
        oldVirtualDom &&
        oldVirtualDom.type !== virtualDom.type &&
        typeof virtualDom.type !== "function"
    ) {
        // 新旧的虚拟dom的类型不同，那么就直接替换原来的dom
        const newDom = createDomElement(virtualDom);
        oldDom.parentNode.replaceChild(newDom, oldDom);
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
        virtualDom.children.forEach((child, i) => {
            diff(child, oldDom, oldDom.childNodes[i]);
        });
        // 如果存在多余的子节点，需要去删除原来的子节点
        const oldChildren = oldDom.childNodes;

        for (
            let i = oldChildren.length - 1;
            i >= virtualDom.children.length;
            i--
        ) {
            // 删除当前的子元素
            oldDom.removeChild(oldChildren[i]);
        }
    }
};

export default diff;
