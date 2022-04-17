import { createDomElement } from "./createDomElement";
import { unmount } from "./unmount";
export default function mountNativeElement(virtualDOM, container, oldDom) {
    // 删除原来的元素节点

    const dom = createDomElement(virtualDOM);
    // 如果virtualDOM上有component属性，则说明是类组件，挂在生成的真实dom到类实例上
    const component = virtualDOM.component;
    if (component) {
        component.setDom(dom);
    }
    if (oldDom) {
        container.insertBefore(dom, oldDom);
        // unmount(oldDom);
    } else {
        // 默认是追加元素到最后面
        container.appendChild(dom);
    }
}
