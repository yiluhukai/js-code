import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementNode from "./updateElementNode";
import { createDomElement } from "./createDomElement";
import diffComponent from "./diffComponent";
import { unmount } from "./unmount";
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
    } else if (typeof virtualDom.type === "function") {
        const oldComponent = oldVirtualDom && oldVirtualDom.component;
        // 要更新的是组件
        // 1) 组件本身的 virtualDom 对象 通过它可以获取到组件最新的 props
        // 2) 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
        // 3) 要更新的 DOM 象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
        // 4) 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
        diffComponent(virtualDom, oldComponent, oldDom, container);
    } else if (oldVirtualDom && oldVirtualDom.type === virtualDom.type) {
        // oldDom存在且和新的dom的type相同
        if (oldVirtualDom.type === "text") {
            // 文本节点
            updateTextNode(virtualDom, oldVirtualDom, oldDom);
        } else {
            // 元素节点，对比去更新元素节点的属性
            updateElementNode(virtualDom, oldDom, oldVirtualDom);
        }
        // 如果存在多余的子节点，需要去删除原来的子节点
        const oldChildren = oldDom.childNodes;

        // 将拥有key属性的元素放入 keyedElements 对象中
        let keyedElements = {};
        for (let i = 0, len = oldChildren.length; i < len; i++) {
            let domElement = oldChildren[i];
            // 是元素节点
            if (domElement.nodeType === 1) {
                let key = domElement.getAttribute("key");
                if (key) {
                    keyedElements[key] = domElement;
                }
            }
        }

        // 看一看是否有找到了拥有 key 属性的元素
        let hasNoKey = Object.keys(keyedElements).length === 0;

        // 如果没有找到拥有 key 属性的元素 就按照索引进行比较
        if (hasNoKey) {
            // 递归对比 Virtual DOM 的子元素
            virtualDom.children.forEach((child, i) => {
                diff(child, oldDom, oldChildren[i]);
            });
        } else {
            // 使用key属性进行元素比较
            virtualDom.children.forEach((child, i) => {
                // 获取要进行比对的元素的 key 属性
                let key = child.props.key;
                // 如果 key 属性存在
                if (key) {
                    // 到已存在的 DOM 元素对象中查找对应的 DOM 元素
                    let domElement = keyedElements[key];
                    // 如果找到元素就说明该元素已经存在 不需要重新渲染
                    if (domElement) {
                        // 虽然 DOM 元素不需要重新渲染 但是不能确定元素的位置就一定没有发生变化
                        // 所以还要查看一下元素的位置
                        // 看一下 oldDOM 对应的(i)子元素和 domElement 是否是同一个元素 如果不是就说明元素位置发生了变化
                        if (oldChildren[i] && oldChildren[i] !== domElement) {
                            // 元素位置发生了变化
                            // 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
                            // domElement 就被放入了当前位置
                            oldDom.insertBefore(domElement, oldChildren[i]);
                        }
                    } else {
                        // 创建并新建元素
                        mountElement(child, oldDom, oldChildren[i]);
                    }
                }
            });
        }

        // 如果旧节点的数量多于要渲染的新节点的长度;
        if (oldChildren.length > virtualDom.children.length) {
            if (hasNoKey) {
                for (
                    let i = oldChildren.length - 1;
                    i >= virtualDom.children.length;
                    i--
                ) {
                    oldDom.removeChild(oldChildren[i]);
                }
            } else {
                for (let i = 0; i < oldChildren.length; i++) {
                    let oldChild = oldChildren[i];
                    let oldChildKey = oldChild._virtualDom.props.key;
                    let found = false;
                    for (let n = 0; n < virtualDom.children.length; n++) {
                        if (oldChildKey === virtualDom.children[n].props.key) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        unmount(oldChild);
                        i--;
                    }
                }
            }
        }
    }
};

export default diff;
