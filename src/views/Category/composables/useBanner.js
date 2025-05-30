import { getBannerAPI } from '@/apis/home.js'
import { onMounted, ref } from 'vue'

 export const useBanner = ()=>{

    // 获取轮播图banner
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: '2' })
    // console.log(res)
    bannerList.value = res.result
  }

  //
  onMounted(() => {
    // 在这里调用的时候的使用的是函数
    getBanner()
  })
  return{
    bannerList,
  }
}