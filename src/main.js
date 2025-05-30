 

import './assets/main.css'
import   piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'

// 引入懒加载插件
import {lazyPlugin} from "@/directives/index.js"

// 加载components 中的两个插件
import {componentPlugin} from '@/components/index.js'

 

/* // 测试接口函数
// import {getCategoryAPI}  from "@/apis/testAPI.js"
// getCategoryAPI().then(res=>{
//   console.log(res);
// }) */

const app = createApp(App)
const pinia = createPinia()

// 把填入的信息存储到本地存储中去

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// 注册懒记载插件
app.use(lazyPlugin)
// 注册使用
app.use(componentPlugin)

app.mount('#app')


// 被优化的懒加载指令 入口文件中一般不包含逻辑程序
/* //在这里我们定义自定义指令
// 1.我们定义一个用于懒加载的自定义指令
app.directive('img-lazy', {
  // 这会在 `mounted` 和 `updated` 时都调用
  // el.style.color = binding.value
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  // 1.el表示绑定的元素本身
  // 2.在这里我们最常用的是binding.value这里是指图片的url
  // 3.在这里我们再次使用vueuse 中的一个useIntersectionObserver 来检测元素是否在视图内
  mounted(el, binding,) {
    // console.log(el,binding.value);
      useIntersectionObserver(
        //  需要被监听的对象 
      el, 
      // isIntersecting 是一个布尔值用来判断元素是否进入视口
      ([{ isIntersecting }],  ) => {
         if(isIntersecting){
          // console.log(111);
          el.src = binding.value
         }
      },
    )
  }
},) */
