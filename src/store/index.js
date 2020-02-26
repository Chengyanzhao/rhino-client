import Vue from 'vue'
import Vuex from 'vuex'
import { getStore } from '@/utils/storage'
import { ACCESS_TOKEN } from './storage-types'
import { SET_TOKEN, SET_USERID, SET_USERNAME } from './mutation-types'
import { login, logout } from '@/api/auth'
import { setStore, clearStore } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getStore(ACCESS_TOKEN),
    userId: '',
    username: ''
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_USERID](state, userId) {
      state.userId = userId
    },
    [SET_USERNAME](state, username) {
      state.username = username
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return login(userInfo).then(res => {
        if (res.status === 0) {
          const { token, userId, userName } = res.data
          setStore(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit(SET_TOKEN, token)
          commit(SET_USERID, userId)
          commit(SET_USERNAME, userName)
          console.log(userName)
          return undefined
        }
        throw res
      })
    },
    Logout({ commit, state }) {
      return logout({ token: state.token }).then(() => {
        commit(SET_TOKEN, '')
        clearStore(ACCESS_TOKEN)
      })
    }
    // GetInfo({ commit }) {
    //   GetInfo()
    // }
  }
})
