import axios from 'axios'
import { notification } from 'ant-design-vue'
import store from '@/store/index'
import { ACCESS_TOKEN } from '@/store/storage-types'
import { getStore } from '@/utils/storage'

const instance = axios.create({
  baseURL: '/api'
})

// axios拦截器
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = getStore(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(config => {
  const token = getStore(ACCESS_TOKEN)
  config.headers.Authorization = `${token}`
  return config
}, err)

instance.interceptors.response.use(response => {
  return response.data
}, err)

export default instance
