// 目标：发布者
class Dep{
    constructor(){
        this.subs = []
    }
    // 添加观察者
    addSub(sub){
        this.subs.push(sub)
    }

    // 发布消息
    notify(){
        this.subs.forEach( sub => sub && sub.update && sub.update())
    }
}



class Watcher{
    update(){
        console.log('update method')
    }
}


// test Code

const dep = new Dep()

const watcher =  new Watcher()

dep.addSub(watcher)
dep.notify()

