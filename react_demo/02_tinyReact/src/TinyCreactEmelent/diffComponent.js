import mountElement from "./mountElement";
import updateComponent from "./updateComponent";
export default function diffComponent(
    virtualDom,
    oldComponent,
    oldDOM,
    container
) {
    // 对比要跟新的类组件
    if (isSameComponent(virtualDom, oldComponent)) {
        updateComponent(virtualDom, oldComponent, oldDOM, container);
    } else {
        // 不是相同的类组件，直接跟新生成新的
        mountElement(virtualDom, container, oldDOM);
    }
}

function isSameComponent(virtualDom, oldComponent) {
    return virtualDom && virtualDom.type === oldComponent.constructor;
}
