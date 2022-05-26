import { createDOMElement } from "../../DOM";

const createStateNode = (fiber) => {
    // 文本节点和元素节点
    if (fiber.tag === "host_component") {
        return createDOMElement(fiber);
    }
};

export default createStateNode;
