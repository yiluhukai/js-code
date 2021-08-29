
// VueRouter是一个类，同时拥有一个install方法
let _Vue = null
export class VueRouter {
  static install (Vue) {
    // 01 保证这个插件只被加载一次
    // 由于webpack再处理模块加载的时候会有缓存，所以导入的VueRouter实质上一个类
    // 而类中的静态方法也是类共享的
    // 所以VueRouter.install.installed是唯一的
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 02 将Vue保存到模块外部变量中已备后续去使用
    _Vue = Vue
    // 03 创建Vue实例时，将选项中的router到Vue的原型上
    // _Vue.prototype.$router = this.$options.router
    // 这里的this是Vue的实例，我们这里访问不到，但是我们可以通过混入的方法
    _Vue.mixin({
      beforeCreate () {
        // 只在选项中有router属性的时候执行一次
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  // 实现构造函数
  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  // 将传入的routes转换成转换成键值对的形式
  createRouteMap () {
    this.options.routes.forEach(
      route => (this.routeMap[route.path] = route.component)
    )
  }

  // 创建router-view和router-link组件
  ininComponents (Vue) {
    const self = this
    Vue.component('router-link', {
      props: {
        to: String
      },
      // 第一个参数是标签，第二个参数是属性，第三个参数是子元素(数组)
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          // 绑定事件
          on: {
            click: this.clickHandle
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandle (e) {
          // 不会触发popstate事件
          history.pushState({}, '', this.to)
          // data是响应式，可以触发视图的重新渲染
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
      // template: '<a :herf="to"> <slot></slot> </a>'
    })

    Vue.component('router-view', {
      // 直接渲染一个组件
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  init () {
    this.createRouteMap()
    this.ininComponents(_Vue)
    this.initEvent()
  }

  initEvent () {
    // popstate事件是我们点击地址栏历史记录的前进和后退的时候触发的
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
