export default function createElement(type, props, ...children) {
    const childElements = [].concat(...children).reduce((result, child) => {
        if (child !== false && child !== true && child !== null) {
            if (child instanceof Object) {
                result.push(child);
            } else {
                result.push(createElement("text", { textContent: child }));
            }
        }
        return result;
    }, []);
    // 为了简单，没有返回children属性
    return {
        type,
        props: Object.assign({ children: childElements }, props),
    };
}
