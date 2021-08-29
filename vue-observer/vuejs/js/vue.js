
class Vue{
    constructor(options = {} ){
        // 01 保存传入的options属性选项
        this.$options =  options
        this.$data =  options.data || {}
        // 如果是选择器，那么需要自己获取dom 对象，如果是dom对象则直接使用
        this.$el = typeof options.el=== 'string' ? document.querySelector(options.el): options.el 
        // 02 将data中的属性转化为vue实例的getter/setter方法
        this._proxyData(this.$data)

        // 03 调用observer实例的，监听data变化
        new Observer(this.$data)
        // 04 调用compiler解析指令和差值表达式
        new Compiler(this)
    }

    _proxyData(data){
        Object.keys(data).forEach( key => {
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                set(val){
                    if(val === data[key]){
                        return 
                    }
                    data[key] = val
                },
                get(){
                    return data[key]
                }
            })
        })
    }
}