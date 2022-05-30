import { createDOMElement } from "../../DOM";
import { createReactInstance } from "../CreateReactInstance";
const createStateNode = (fiber) => {
    // 文本节点和元素节点
    if (fiber.tag === "host_component") {
        return createDOMElement(fiber);
    } else {
        return createReactInstance(fiber);
    }
};

export default createStateNode;
