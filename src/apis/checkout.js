// 封装使用结算页面的接口
// 封装购物车相关接口
import request from '@/utils/http.js'

// 获取详情接口
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}


// 创建订单
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
 