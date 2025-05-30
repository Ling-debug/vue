// 导入封装好的http 
import httpInstance from '@/utils/http.js'
  
export const getOrderAPI = (id)=>{
      return httpInstance({
        url:`/member/order/${id}`
      })
}