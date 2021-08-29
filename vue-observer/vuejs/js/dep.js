/*
 * @Author: your name
 * @Date: 2021-08-01 22:49:28
 * @LastEditTime: 2021-08-01 22:51:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-code/vue-observer/vuejs/js/dep.js
 */
class Dep{
    constructor(){
        this.subs = []
    }
    // 添加观察者
    addSub(sub){
        if(sub && sub.update){
            this.subs.push(sub)
        } 
    }
    // 发布消息
    notify(){
        this.subs.forEach( sub => sub.update())
    }
}
