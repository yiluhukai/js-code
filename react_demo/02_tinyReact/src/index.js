import TinyReact from "./TinyCreactEmelent";
// const virtualDOM = (
//     <div className="container" data-test="container">
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
const container = document.getElementById("root");

// const virtualDOM = (
//     <div>
//         <Heart title="bruce"></Heart>;123
//     </div>
// );
// console.log(virtualDOM);
// const modifyVirtualDOM = (
//     <div className="container">
//         <h1>你好 Tiny React</h1>
//         <h2>(编码必杀技)</h2>
//         <div data-test="123">
//             嵌套1 <div>嵌套 1.1</div>
//         </div>
//         <h3>(观察: 这个将会被改变)</h3>
//         {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//         {2 == 2 && <div>2</div>}
//         <span>这是一段更新后的内容</span>
//         <button onClick={() => alert("你好")}>点击我</button>
//         <h6>这个将会被删除</h6>
//         {/* 2, 3<input type="text" value="hello"></input> */}
//     </div>
// );

// TinyReact.render(virtualDOM, container);

// setTimeout(() => {
//     TinyReact.render(modifyVirtualDOM, container);
// }, 2000);

// class Alert extends TinyReact.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             title: "default title",
//         };
//         this.changeTitle = this.changeTitle.bind(this);
//     }
//     changeTitle() {
//         this.setState({ title: "changed Title" });
//     }
//     render() {
//         console.log(this.props);
//         return (
//             <div>
//                 {this.props.name} {this.props.age}
//                 <p>{this.state.title}</p>
//                 <button onClick={this.changeTitle}>change Title</button>
//             </div>
//         );
//     }
// }

// TinyReact.render(<Alert name="bruce" age="12"></Alert>, container);
// export default class Hearts extends TinyReact.Component {
//     render() {
//         return <div>Heart !</div>;
//     }
// }

// setTimeout(() => {
//     // 更新的是同一个组件
//     TinyReact.render(<Alert name="zce" age="20"></Alert>, container);
//     // 不同的组件
//     // TinyReact.render(<Hearts></Hearts>, container);
// }, 2000);

class RefDomo extends TinyReact.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [
                { name: "张三", id: "1" },
                { name: "李四", id: "2" },
                { name: "王五", id: "3" },
            ],
            count: 0,
        };
    }
    changeOrder() {
        const { people, count } = this.state;
        const p = people.shift();
        people.push(p);
        this.setState({ people: people, count: count + 1 });
    }

    addPeople() {
        const { people } = this.state;
        people.splice(1, 0, { name: "zzz", id: "4" });
        this.setState({ people });
    }

    deletePeople() {
        const { people } = this.state;
        // people.pop();
        // console.error(people);

        this.setState({ people: people.slice(1) });
    }

    render() {
        console.log(this.state.people);
        return (
            <div>
                {/* <input
                    type="text"
                    value="aaa"
                    ref={(input) => (this.input = input)}
                ></input>
                <button onClick={this.handleClick.bind(this)}>test ref</button>
                <Alert
                    ref={(alert) => (this.alert = alert)}
                    name="zce"
                    age={12}
                ></Alert> */}
                <ul>
                    {/* <li>1</li>
                    <li>2</li> */}

                    {this.state.people.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>

                <button onClick={this.changeOrder.bind(this)}>
                    changeOrder{this.state.count}
                </button>
                <button onClick={this.addPeople.bind(this)}>Add people</button>
                <button onClick={this.deletePeople.bind(this)}>
                    delete people
                </button>
            </div>
        );
    }

    handleClick() {
        console.log(this.input.value);
        console.log(this.alert);
    }
}

TinyReact.render(<RefDomo />, container);
