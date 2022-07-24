export default function updateElementNode(
    virtualDom,
    newElement,
    oldVirtualDom = {}
) {
    const propsObj = virtualDom.props || {};
    const oldPropsObj = oldVirtualDom.props || {};

    // 对文本节点的更新
    if (virtualDom.type === "text") {
        // 文本的属性不同
        if (propsObj.textContent !== oldPropsObj.textContent) {
            // 更新的时候需要去对比父元素的类型,为什么呢 ，因为父元素的类型不同，更新完子节点后回去创建新的无法给父节点替换节点，
            // 因为原来的子节点oldVirtualDom.stateNode，不存在virtualDom.parent.stateNode上
            if (virtualDom.parent.type !== oldVirtualDom.parent.type) {
                // 父元素的类型不同
                virtualDom.parent.stateNode.appendChild(
                    document.createTextNode(propsObj.textContent)
                );
            } else {
                // 父元素的类型相同
                virtualDom.parent.stateNode.replaceChild(
                    document.createTextNode(propsObj.textContent),
                    oldVirtualDom.stateNode
                );
            }
        }
        return;
    }

    Object.keys(propsObj).forEach((prop) => {
        const propValue = propsObj[prop];
        const oldPropValue = oldPropsObj[prop];
        if (propValue !== oldPropValue) {
            if (prop.slice(0, 2) === "on") {
                // 当我们要添加的属性是元素的事件
                const eventName = prop.slice(2).toLowerCase();
                if (oldPropValue) {
                    // 删除旧的事件
                    newElement.removeEventListener(eventName, oldPropValue);
                }
                newElement.addEventListener(eventName, propValue);
            } else if (prop === "value" || prop === "checked") {
                // bool属性
                newElement[prop] = propValue;
            } else if (prop !== "children") {
                // class属性和其他的属性
                if (prop === "className") {
                    newElement.setAttribute("class", propValue);
                } else {
                    newElement.setAttribute(prop, propValue);
                }
            }
        }
    });
    // 判断属性被删除的情况(旧的虚拟上有但是新的没有)

    Object.keys(oldPropsObj).forEach((prop) => {
        const propValue = propsObj[prop];
        const oldPropValue = oldPropsObj[prop];
        if (!propValue) {
            if (prop.slice(0, 2) === "on") {
                const eventName = prop.slice(2).toLowerCase();
                newElement.removeEventListener(eventName, oldPropValue);
            } else if (prop !== "children") {
                newElement.removeAttribute(prop);
            }
        }
    });
    newElement._virtualDom = virtualDom;
}
