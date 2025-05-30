//封装主页固定内容之外的api接口 包括轮播图，新鲜好物，热门推荐，

// 导入封装好的http
import httpInstance from '@/utils/http.js'

// 改造接口数据以接收传递过来的数据
export function getBannerAPI(params = {}) {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params:{
      distributionSite
    }
  })
}

export function getNewAPI() {
  return httpInstance({
    url: '/home/new',
  })
}
export function getHotAPI() {
  return httpInstance({
    url: '/home/hot',
  })
}
/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}
