import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Detail from './Detail/detail';
import style from './Detail.module.css'
function Index() {
	return <div>首页</div>;
}
class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        id: 1,
        title: '新闻1'
      }, {
        id: 2,
        title: '新闻2'
      }]
    }
  }
    
  render() {
    return (
      <div>
        <div className={style.title}>新闻列表组件</div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`/detail?id=${item.id}`}>{item.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <div>
        <Link to="/index">首页</Link>
        <Link to="/news">新闻</Link>
      </div>
      <div>
        <Route path="/index" component={Index}/>
        <Route path="/news" component={News}/>
        <Route path="/detail" component={Detail}/>
      </div>
    </Router>
  );
}