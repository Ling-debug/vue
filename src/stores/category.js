import { ref} from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from "@/apis/layout.js"

export const useCounterStore = defineStore('category', () => {
 // 定义一个数组用来接收数据
const categorylist = ref([]) 
// 定义一个函数用来使用接收函数
const getCategory = async()=>{
  const res = await  getCategoryAPI()
  // 把获取到的数据赋值给本地数据
  categorylist.value = res.result
}
  return { 
    categorylist,
    getCategory
  }
})
