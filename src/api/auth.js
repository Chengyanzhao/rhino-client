import api from './index'
import request from '@/utils/request'

export function register(param) {
  return request({
    url: api.auth.Register,
    method: 'POST',
    data: param
  })
}

export function login(param) {
  return request({
    url: api.auth.login,
    method: 'POST',
    data: param
  })
}

export function logout(param) {
  return request({
    url: api.auth.logout,
    method: 'POST',
    data: param
  })
}

export function getInfo(param) {
  request({
    url: api.user.info,
    method: 'get',
    data: param
  })
}
