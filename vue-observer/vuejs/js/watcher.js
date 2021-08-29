/*
 * @Author: your name
 * @Date: 2021-08-01 23:00:07
 * @LastEditTime: 2021-08-01 23:09:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-code/vue-observer/vuejs/js/watcher.js
 */
class Watcher{
    constructor(vm,key,cb){
        // vue实例
        this.vm = vm
        // vm对应的key
        this.key =  key
        // 数据更新时更新视图的方法
        this.cb = cb
        // 获取原始数据的时候，会触发data中的get方法
        // 所以可以在data的get方法中添加观察者到dep
        Dep.target = this
        this.oldValue = vm[key]
        Dep.target = null
    }

    update(){
        const newValue = this.vm[this.key]
        if( newValue=== this.oldValue){
            rerurn
        } 
        // 方便下一次的对比
        this.oldValue = newValue
        this.cb(newValue)
    }
}