import request from '../request'

export default {
  install: (Vue) => {
    Object.defineProperties(Vue.prototype, {
      $axios: {
        get: () => {
          return request
        }
      },
      $http: {
        get: () => {
          return request
        }
      }
    })
  }
}
