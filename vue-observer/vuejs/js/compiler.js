/*
 * @Author: your name
 * @Date: 2021-08-01 21:06:00
 * @LastEditTime: 2021-08-01 23:34:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-code/vue-observer/vuejs/js/compiler.js
 */
class Compiler{
    constructor(vm){
        this.el = vm.$el
        this.vm =  vm
        this.compile(this.el)
    }
    // 负责编译模版
    compile(el){
        // 获取元素的子节点
        const childNodes  = el.childNodes
        Array.from(childNodes).forEach( childNode => {
            // 根据节点的类型来调用不同的编译方法
            if(this.isTextNode(childNode)){
                this.compileText(childNode)
            }else if(this.isElementNode(childNode)){
                this.compileElement(childNode)
            }
            // 当前节点如果还有子节点，递归调用去编译子节点
            if(childNode.childNodes&&childNode.childNodes.length){
                this.compile(childNode)
            }
        })
    }
    // 编译元素节点
    compileElement(node){
        // 主要是对元素上的指令做解析
        // 获取元素的所有属性
        const attrs  = node.attributes
        Array.from(attrs).forEach(attr => {
            const attrName =  attr.name
            if(this.isDirective(attrName)){
                //是一个指令 v-text 、v-model
                const name = attrName.substring(2)
                this.update(node,name, attr.value)
            }
        })
    }

    update(node,name,key){
        const func = this[name + 'Updater']
        func && func.call(this, node, key)
    }
    // 处理text指令
    textUpdater(node,key){
        node.textContent = this.vm[key]
        // 为当前的节点添加一个watcher到对应key的dep中
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        })
    }
    // 处理model指令
    modelUpdater(node, key){
        node.value = this.vm[key]
        // 实现双向数据绑定
        node.addEventListener('input',(e)=>{
            this.vm[key] = node.value //e.target.value
        })
         // 为当前的节点添加一个watcher到对应key的dep中
        new Watcher(this.vm,key,(newValue)=>{
            node.value = newValue
        })
    }

    // 编译文本节点
    compileText(node){
        // {{ msg }} 使用正则表达式去匹配
        // +号后面的？代表非贪婪匹配
        const reg = /\{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)){
            //是差值表达式
            // 提取其中的msg作为key
            const key =  RegExp.$1.trim()
            // 将 {{ msg}} 替换成具体的值
            node.textContent = value.replace(reg,this.vm[key])

            // 为当前的节点添加一个watcher到对应key的dep中
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue
            })

        }
    }

    // 判断是否是指令

    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    // 判断是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    // 判断是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}