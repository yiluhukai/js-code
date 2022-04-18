export function unmount(dom) {
    // 获取节点对应的 virtualDOM 对象
    const virtualDOM = dom._virtualDom;
    // 如果要删除的节点时文本
    if (virtualDOM.type === "text") {
        // 直接删除节点
        dom.remove();
        // 阻止程序向下运行
        return;
    }
    // 查看节点是否由组件生成
    let component = virtualDOM.component;
    // 如果由组件生成
    if (component) {
        // 调用组件卸载生命周期函数
        component.componentWillUnmount();
    }

    // 如果节点具有 ref 属性 通过再次调用 ref 方法 将传递给组件的DOM对象删除
    if (virtualDOM.props && virtualDOM.props.ref) {
        virtualDOM.props.ref(null);
    }

    // 事件处理
    Object.keys(virtualDOM.props).forEach((propName) => {
        if (propName.slice(0, 2) === "on") {
            const eventName = propName.toLowerCase().slice(2);
            const eventHandler = virtualDOM.props[propName];
            dom.removeEventListener(eventName, eventHandler);
        }
    });

    // 递归删除子节点
    if (dom.childNodes.length > 0) {
        for (let i = 0; i < dom.childNodes.length; i++) {
            // 如果是元素节点，才递归调用去卸载元素,如果是文本节点，我们删除当前节点就可以删除对应的文本节点
            if (dom.childNodes[i].nodeType === 1) {
                unmount(dom.childNodes[i]);
                i--;
            }
        }
    }
    // 只是将dom对应的对象从dom树上一处，如果有其他的引用只想它，我们还是可以访问到这个dom对象
    dom.remove();
}
