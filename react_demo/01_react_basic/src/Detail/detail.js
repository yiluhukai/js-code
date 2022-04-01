import React from "react";
import url from 'url';
import style from '../Detail.module.css'
export default class Detail extends React.Component {

    render() {
      const { query } = url.parse(this.props.location.search, true);
        console.log(query); // {id: 1}
      return <div className={style.title}>新闻详情</div>
    }
  }