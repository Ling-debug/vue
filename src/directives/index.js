// 执行懒加载指令
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app){
      // 懒加载指令
      // 定义自定义指令
    // 1.定义一个用于懒加载的自定义指令
    app.directive('img-lazy', {
      // 这会在 `mounted` 和 `updated` 时都调用
      // el.style.color = binding.value
      // 在绑定元素的父组件
      // 及他自己的所有子节点都挂载完成后调用
      // 1.el表示绑定的元素本身
      // 2.最常用的是binding.value这里是指图片的url
      // 3.再次使用vueuse 中的一个useIntersectionObserver 来检测元素是否在视图内
      mounted(el, binding,) {
        // console.log(el,binding.value);
        //从原型中解构一个对象出来控制isIntersecting 的运行使其运行一次就停止
          const {stop} =  useIntersectionObserver(
          el,/* 需要被监听的对象 */
          // isIntersecting 是一个布尔值用来判断元素是否进入视口
          ([{ isIntersecting }],  ) => {
            if(isIntersecting){
              // console.log(111);
              el.src = binding.value
              stop
            }
          },
        )
      }
    },)

    }
}