const getTag = (vdom) => {
    // 文本节点和元素节点
    if (typeof vdom.type === "string") {
        return "host_component";
    }
};
export default getTag;
