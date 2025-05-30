// axios基础的封装
import axios from 'axios'
import {useUserStore} from '@/stores/user.js'
import { ElMessage } from 'element-plus'

// import  router from "@/router";


// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间的限制
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1.从pinia获取token数据
  const userStore = useUserStore()
  // 2.按照后端的要求拼接token数据
  const token  =userStore.userInfo.token
 
  if(token){
    // 使用Axios拦截器为所有的请求自动设置Authorization header。
    config.headers.Authorization = `Bearer ${token}`
  }
  // 对config 处理完之后返回，下一步将向后端发送请求
  // console.log(config);
  return config
}, 
// 当发生错误时，执行该部分代码
e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
 

  })
  // // 错误状态码401的处理
  // // 1.清空本地数据
  // // 2.跳转登录页
  // if(e.response.status === 401){
  //   const userStore = useUserStore()
  //   userStore.clearUserInfo()
  //   router.push('/login')
  // }
  return Promise.reject(e)
})


export default httpInstance