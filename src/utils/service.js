import axios from 'axios'
import { getToken } from '@/utils/token'
import { Message } from 'element-ui' 

const service = axios.create({
  baseURL: '/api', // baseURL 会自动加在每次请求的最前面，然后被 vue.config.js 解析
  timeout: 3000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 发送请求的前置操作（如添加 token）
  config.headers['token'] =  getToken('token')
  // config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 收到响应的后置操作
  let { code, message } = res.data
  if (code !== 200) {
    Message({ message: message || 'error', type: 'warning' })
  }
  return res
}, error => {
  return Promise.reject(error)
})

export default service