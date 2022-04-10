export default function updateTextNode(virtualDom, oldVirtualDom, oldDom) {
    if (virtualDom.props.textContent !== oldVirtualDom.props.textContent) {
        //更新文本节点的内容
        oldDom.textContent = virtualDom.props.textContent;
        // 更新久的虚拟dom
        oldDom._virtualDom = virtualDom;
    }
}
