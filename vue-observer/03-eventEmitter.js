/*
 * @Author: your name
 * @Date: 2021-07-31 16:54:14
 * @LastEditTime: 2021-07-31 17:02:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-code/vue-observer/03-eventEmitter.js
 */
class EventEmitter{
    constructor(){
        // 以键值对的形式存储事件和事件处理函数 { [string]: Array }
        this.hub = {}
    }
    // 订阅事件的方法
    $on(eventName,func){
        if(!this.hub[eventName]){
            this.hub[eventName] = []
        }
        this.hub[eventName].push(func)
    }
    // 发布事件的方法

    $emit(eventName){
        if(this.hub[eventName]){
            this.hub[eventName].forEach( func => {
                func()
            });
        }
    }
}

// test code


const eventBus  =  new EventEmitter()

eventBus.$on('event1',function(){
    console.log('hello')
})

eventBus.$emit('event1')
