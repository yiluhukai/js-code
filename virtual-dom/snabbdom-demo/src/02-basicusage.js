/*
 * @Author: your name
 * @Date: 2021-08-08 20:15:08
 * @LastEditTime: 2021-08-08 20:27:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-code/virtual-dom/snabbdom-demo/src/02-basicusage.js
 */
import { h } from "snabbdom/build/package/h";
import { init } from "snabbdom/build/package/init";  

const patch = init([]);

// 第一个参数是元素的标签和选择器
// 第二个参数可以是子元素
const vNode = h("div#container.test",[h("p","helo snabbdom"),h("h1","------")]) 

const el = document.querySelector('#app')

const oldVnode = patch(el,vNode)


setTimeout(()=>{
    // const vNode = h("div#container.test",[h("p","helo world"),h("h1","zzzzz")]) 
    // patch(oldVnode,vNode)
    // 替换成空的注释节点
    patch(oldVnode,h("!"))
},2000)