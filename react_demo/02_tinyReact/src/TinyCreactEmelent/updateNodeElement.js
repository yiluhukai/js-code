export const updateNodeElement = (virtualDom, childNode) => {
    const propsObj = virtualDom.props;
    Object.keys(propsObj).forEach((prop) => {
        const value = propsObj[prop];
        if (prop.slice(0, 2) === "on") {
            // 当我们要添加的属性是元素的事件
            const eventName = prop.slice(2).toLowerCase();
            childNode.addEventListener(eventName, value);
        } else if (prop === "value" || prop === "checked") {
            // bool属性
            childNode[prop] = value;
        } else {
            // class属性和其他的属性
            if (prop === "className") {
                childNode.setAttribute("class", value);
            } else {
                childNode.setAttribute(prop, value);
            }
        }
    });
};
