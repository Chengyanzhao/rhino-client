import axios from 'axios'
import { notification } from 'ant-design-vue'
import store from '@/store/index'
import { SET_TOKEN } from '@/store/mutation-types'
import { ACCESS_TOKEN } from '@/store/storage-types'
import { getStore } from '@/utils/storage'

const instance = axios.create({
  baseURL: '/api'
})

// axios拦截器
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = getStore(ACCESS_TOKEN)
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
      store.commit(SET_TOKEN, '')
      // store.dispatch('Logout').then(() => {
      window.location.reload()
      // })
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
