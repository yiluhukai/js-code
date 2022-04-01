export function createElement(type, props, ...children) {
    const childElements = children.reduce((result, child) => {
        // 忽略布尔值和null
        if (child !== true && child !== false && child !== null) {
            // 不是对象的时候是文本节点
            if (child instanceof Object) {
                result.push(child);
            } else {
                //文本节点
                result.push(createElement("text", { textContent: child }));
            }
        }
        return result;
    }, []);
    return {
        type,
        props: Object.assign({ children: childElements }, props),
        children: childElements,
    };
}
