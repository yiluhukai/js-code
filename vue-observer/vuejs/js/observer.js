class Observer {
    constructor(data){
        this.walk(data)
    }   
    
    // 遍历对象的属性
    walk(data){
        if(!data || typeof data !=='object'){
            return
        }
        Object.keys(data).forEach(key=> this.defineReactive(data,key,data[key]))
    }
    // 将对象的属性转化成响应式的
    defineReactive(data,key,value){
        // 如果value 是一个对象，对象的属性也要转化成响应式
        const that = this
        this.walk(value)
        const dep = new Dep()
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue){
                if(newValue === value){
                    return 
                }
                value = newValue
                 // 当我们修改对象中的属性为一个对象的时，这个对象中的数据也要是响应式的
                that.walk(newValue)
                // 发送通知给watcher
                dep.notify()
            }
        })
    }
}