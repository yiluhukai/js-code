export default function updateElementNode(
    virtualDom,
    newElement,
    oldVirtualDom = {}
) {
    const propsObj = virtualDom.props || {};
    const oldPropsObj = oldVirtualDom.props || {};
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
