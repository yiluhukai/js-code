import mountElement from "./mountElement";
const diff = (virtualDom, container, oldDom) => {
    // 先只考虑oldDom不存在的情况(第一次挂载)

    if (!oldDom) {
        mountElement(virtualDom, container);
    }
};

export default diff;
