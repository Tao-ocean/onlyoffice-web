import axios from 'axios'
axios.defaults.withCredentials = true

export function request (config) {
  // 1. 创建实例
  const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: 'http://localhost:9520',
    timeout: 3000
  })
  // 2. 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error)
  })
  // 3.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },
  error => {
    console.log(error)
  })
  return instance(config)
}
export default request
