import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";
export default function mountComponent(virtualDom, container) {
    // 判断是函数式组件还是类组件
    let nextVirtualDom = null;
    if (isFunctionComponent(virtualDom)) {
        nextVirtualDom = buildFunctionComponent(virtualDom);
    } else {
        //类组件
        nextVirtualDom = buildClassComponent(virtualDom);
    }
    if (isFunction(nextVirtualDom)) {
        mountComponent(nextVirtualDom, container);
    } else {
        mountNativeElement(nextVirtualDom, container);
    }
}

function buildFunctionComponent(virtualDom) {
    // 传递属性给组件函数
    return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
    const component = new virtualDom.type(virtualDom.props || {});
    return component.render();
}
