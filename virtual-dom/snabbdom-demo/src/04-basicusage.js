import { h } from "snabbdom/build/package/h";
import { init } from "snabbdom/build/package/init";  

const patch = init([]);

// 第一个参数是元素的标签和选择器
// 第二个参数是元素的内容
const vNode = h("div#container.test",{ 
    hook:{ 
        init(){ console.log('init hook') },
        create(){ console.log('create hook') }   
    }    
},"Hello world") 


// 第一个参数可以是旧的vNode，也可以是真实dom
// 第一个参数是新vNode
// 返回值是的新的vNode

const el =  document.querySelector("#app")
// 为下一次更新去使用
const oldVnode = patch(el,vNode)

