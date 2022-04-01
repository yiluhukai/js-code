import diff from "./diff";
export const render = (virtualDom, container, oldDom) => {
    // 渲染前需要对比oldDom
    diff(virtualDom, container, oldDom);
};
