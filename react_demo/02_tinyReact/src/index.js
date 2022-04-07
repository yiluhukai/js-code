import TinyReact from "./TinyCreactEmelent";
// const virtualDOM = (
//     <div className="container">
//         <h1>你好 Tiny React</h1>
//         <h2>(编码必杀技)</h2>
//         <div>
//             嵌套1 <div>嵌套 1.1</div>
//         </div>
//         <h3>(观察: 这个将会被改变)</h3>
//         {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//         {2 == 2 && <div>2</div>}
//         <span>这是一段内容</span>
//         <button onClick={() => alert("你好")}>点击我</button>
//         <h3>这个将会被删除</h3>
//         2, 3<input type="text" value="hello"></input>
//     </div>
// );
const Heart = (props) => <div> &Heart {props.title}</div>;
// console.log(virtualDOM);
// 使用render方法将虚拟dom转换成真实dom
const conatienr = document.getElementById("root");

// const virtualDOM = (
//     <div>
//         <Heart title="bruce"></Heart>;123
//     </div>
// );
// console.log(virtualDOM);
// TinyReact.render(virtualDOM, conatienr);

class Alert extends TinyReact.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.name} {this.props.age}
            </div>
        );
    }
}

TinyReact.render(<Alert name="bruce" age="12"></Alert>, conatienr);
