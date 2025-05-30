import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user.js'
import { findNewCartListAPI, insertCartAPI ,delCartAPI } from '@/apis/cart.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList = ref([])


    // 定义action 函数
    const addCart = async goods => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 进入登录状态
        await insertCartAPI({ skuId, count })
        updateCartList()

      } else {
        // 进入本地状态
        // 添加购物车
        // 1.购物车中有的数据
        // console.log(goods);
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        // console.log(item)
        if (item) {
          // 1.购物车中已经存在的
          item.count = item.count + goods.count
        } else {
          // 2.购物车中没有的
          cartList.value.push(goods)
        }
      }
    }
    // 删除购物车中
    const delCart = async (skuId) => {
      if(isLogin.value){
        await delCartAPI([skuId])
        updateCartList()

      }else{
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
      }
 
    }
    // 退出登入时清楚购物车信息
    const clearCart = ()=>{
      cartList.value =[]
    }

    // 定义合并更新购物车数据
    const updateCartList = async ()=>{
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }



    //控制单选按钮的状态
    const singleCheck = (i, selected) => {
      const item = cartList.value.find((item) => i.skuId === item.skuId)
      if (item) {
        item.selected = selected
      }
    }
    // 根据多选按钮的状态来控制单选按钮
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 使用计算属性来计算中价格
    // 计算总数量
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    )
    // 计算总的价格
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    )

    // 计算被选中后的商品的数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    )
    // 定义全选状态
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 把数据return出去0
    return {
      singleCheck,
      allCheck,
      selectedCount,
      selectedPrice,
      isAll,
      allCount,
      allPrice,
      cartList,
      addCart,
      delCart,
      clearCart,
      updateCartList,
    }
  },
  {
    persist: true,
  }
)
