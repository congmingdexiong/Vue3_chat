import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 可以在这里添加其他默认请求头，如认证token等
  },
})

// 添加请求拦截器（可选）
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加Token
    // config.headers.Authorization = `Bearer ${token}`;
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器（可选）
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，例如错误码处理
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default api
