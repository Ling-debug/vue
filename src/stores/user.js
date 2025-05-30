// 获取用户登入的数据,获取用登入的信息

import { loginAPI } from '@/apis/user.js'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useCartStore} from './cartStore'
import {mergeCartAPI} from '@/apis/cart.js'


export const useUserStore = defineStore('user',  () => {
  const cartStore = useCartStore()
   // 定义一个管理数据的store
   const userInfo = ref({})
   // 2.定义获取接口数据的action函数
   const getUserInfo = async({ account, password })=>{
     const res = await loginAPI({ account, password })
     userInfo.value = res.result
    //  在登入时来合并购物车 要传递三个参数
      mergeCartAPI(cartStore.cartList.map(item =>{
        return{
          skuId:item.skuId,
          selected:item.selected,
          count:item.count
        }
      }))
      // 更新购物车的数据
      cartStore.updateCartList()


   }
  //  退出时清楚用户的信息、同时清理用户购物车中的信息
   const clearUserInfo = ()=>{
    userInfo.value= {}
    // 清楚购物车中的信息
    cartStore.clearCart()

   }
 
   // 3.把数据return出去
 
   return {  
     userInfo,
     getUserInfo,
     clearUserInfo
    }
},{
  persist:true
})
 