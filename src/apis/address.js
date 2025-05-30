// 封装关于地址方面的接口
//  
import request from '@/utils/http.js'

// 添加收获地址接口
export const createAddressAPI = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}

// 删除当前的地址接口
export const deleteAddressAPI = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE',
     
  })
}
// 修改当前的地址接口
export const putAddressAPI = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'PUT',
     
  })
}
 