// 把components 中的组件都进行全局化注册
// 通过插件的方式来
import ImgView from "./imgView/index.vue"
import Sku from  "./XtxSku/index.vue"

 export const componentPlugin  ={
  install(app){
    // app.component ("组件名字"，组件配置对象)
    app.component('XtxImView',ImgView)
    app.component('XtxSku',Sku)

  }
}