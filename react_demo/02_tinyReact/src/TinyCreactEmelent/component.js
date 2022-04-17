import diff from "./diff";

export default class Component {
    constructor(props) {
        this.props = props;
    }
    // 修改组件组件的方法
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        // 生成新的虚拟dom
        const virtualDom = this.render();
        // 对比前后两次的虚拟dom
        // 获取之前生成的真实dom
        const oldDom = this.getDom();
        // 调用diff方法跟新dom
        diff(virtualDom, oldDom.parentNode, oldDom);
    }

    // 保存累组件生成的dom
    setDom(dom) {
        this._dom = dom;
    }
    // 获取类组件对应的dom
    getDom() {
        return this._dom;
    }
    // 添加生命周期函数
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state;
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, preState) {}
    componentWillUnmount() {}
    // 更新props属性
    updateProps(props) {
        this.props = props;
    }
}
