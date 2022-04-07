import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
export default function mountElement(virtualDOM, container) {
    // virtualDom有可能是一个函数组件或者类组件
    // 如果是一个组件，virtualDom的type是一个函数
    if (isFunction(virtualDOM)) {
        mountComponent(virtualDOM, container);
    } else {
        mountNativeElement(virtualDOM, container);
    }
}
