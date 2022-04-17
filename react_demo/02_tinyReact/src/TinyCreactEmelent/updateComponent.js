import diff from "./diff";

export default function updateComponent(
    virtualDom,
    oldComponent,
    oldDOM,
    container
) {
    // 更新组件的同时调用生命周期函数
    const nextProps = virtualDom.props;
    const prevProps = oldComponent.props;
    oldComponent.componentWillReceiveProps(nextProps);

    if (oldComponent.shouldComponentUpdate(nextProps)) {
        oldComponent.componentWillUpdate(nextProps);
        //跟新类组件的属性
        oldComponent.updateProps(nextProps);
        // 重新生成新的虚拟dom
        const nextVirtualDom = oldComponent.render();
        // 挂载component实例到虚拟dom,为新一次的对比做准备
        nextVirtualDom.component = oldComponent;
        // 调用diff方法去更新视图
        diff(nextVirtualDom, container, oldDOM);
        oldComponent.componentDidUpdate(prevProps);
    }
}
