import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";
export default function mountComponent(virtualDom, container, oldDom) {
    // 判断是函数式组件还是类组件
    let nextVirtualDom = null,
        component = null;
    if (isFunctionComponent(virtualDom)) {
        nextVirtualDom = buildFunctionComponent(virtualDom);
    } else {
        //类组件
        nextVirtualDom = buildClassComponent(virtualDom);
        component = nextVirtualDom.component;
    }
    if (isFunction(nextVirtualDom)) {
        mountComponent(nextVirtualDom, container, oldDom);
    } else {
        mountNativeElement(nextVirtualDom, container, oldDom);
    }

    // 设置类组件的component
    if (component) {
        // if (virtualDom && virtualDom.props && virtualDom.props.ref) {
        //     virtualDom.props.ref(component);
        // }

        if (component && component.props && component.props.ref) {
            component.props.ref(component);
        }
    }
}

function buildFunctionComponent(virtualDom) {
    // 传递属性给组件函数
    return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
    const component = new virtualDom.type(virtualDom.props || {});
    const nextvirtualDom = component.render();
    // 将类组件实例上挂载到对应的虚拟dom上
    nextvirtualDom.component = component;
    return nextvirtualDom;
}
