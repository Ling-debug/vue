import { getCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'

export const useCategory = ()=>{
  // 获取category
const categoryData = ref({})
const route = useRoute()
const getCategory = async (id = route.params.id) => {
  const res = await getCategoryAPI(id)
  categoryData.value = res.result
}

onMounted(() => getCategory())

// 为了解决路由缓存的问题（复用同一个组件时该组件的生命周期参数钩子不会再次被触发）
// 这个函数用于实时监听路由参数的变化，只要路由参数由变化就能触发
onBeforeRouteUpdate((to)=>{
  // console.log(`实时监听路由参数的变化`);
  //打印目标地址的对象
  // console.log(to);
  getCategory(to.params.id)
})
return{
  categoryData,
}

}