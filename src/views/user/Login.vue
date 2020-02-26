<template>
  <div class="login">
    <div class="login-header">
      <h3 class="login-title"
          v-once>{{title}}</h3>
    </div>
    <div class="login-content">
      <span class="login-content-title">登录</span>
      <div class="login-content-alert">
        <a-alert v-if="isLoginFail"
                 :message="failMsg"
                 type="error"
                 showIcon
                 style="margin-bottom: 24px;" />
      </div>
      <div class="login-form">
        <a-form :form="form"
                @submit="handleSubmit">
          <!-- 用户名 -->
          <a-form-item>
            <a-input size="large"
                     type="text"
                     placeholder="邮箱"
                     v-decorator="fieldDecorator.username">
              <a-icon slot="prefix"
                      type="user"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <!-- 密码 -->
          <a-form-item>
            <a-input size="large"
                     type="password"
                     autocomplete="false"
                     placeholder="密码"
                     v-decorator="fieldDecorator.password">
              <a-icon slot="prefix"
                      type="lock"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <!-- 自动登录 -->
          <!-- <a-form-item>
            <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
            <router-link :to="{ name: 'recover', params: { user: 'aaa'} }"
                         class="forge-password"
                         style="float: right;">忘记密码</router-link>
          </a-form-item> -->
          <!-- 确定按钮 -->
          <a-form-item class="login-form-control">
            <a-button size="large"
                      type="dashed"
                      block
                      ghost
                      htmlType="submit"
                      class="login-button"
                      :disabled="loading">注册</a-button>
            <a-button size="large"
                      type="primary"
                      block
                      htmlType="submit"
                      :loading="loading"
                      :disabled="loading">确定</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapMutations, mapActions } from 'vuex'
import { Row, Col, Form, Input, Checkbox, Button, Icon, Alert } from 'ant-design-vue'
// import { login } from '@/api/auth'
import { SET_TOKEN, SET_USERID, SET_USERNAME } from '@/store/mutation-types'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([Row, Col, Form, Form.Item, Input, Checkbox, Button, Icon, Alert])

export default {
  name: 'login',
  components: comps,
  data() {
    return {
      title: '犀牛图床',
      form: Form.createForm(this),
      fieldDecorator: {
        username: [
          'username',
          {
            rules: [
              { required: true, message: '请输入邮箱地址' }
              // { validator: this.handleUsernameOrEmail },
            ],
            validateTrigger: 'change'
          }
        ],
        password: [
          'password',
          {
            rules: [{ required: true, message: '请输入密码' }],
            validateTrigger: 'blur'
          }
        ]
      },
      loading: false,
      username: '',
      password: '',
      isLoginFail: false,
      failMsg: '',
      isLoginLoading: false
    }
  },
  methods: {
    ...mapMutations([SET_TOKEN, SET_USERID, SET_USERNAME]),
    ...mapActions(['Login']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.failMsg = ''
      this.isLoginFail = false
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const loginParams = values
          loginParams.username = values.username
          loginParams.password = md5(values.password)
          this.Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(error => this.requestFailed(error))
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    loginSuccess(result) {
      // const { token, userId, userName } = result.data
      // this[SET_TOKEN](token)
      // this[SET_USERID](userId)
      // this[SET_USERNAME](userName)
      const redirect = decodeURIComponent(this.$route.query.redirect || '/')
      this.$router.push({ path: redirect })
    },
    requestFailed(errData) {
      if (errData.msg) {
        this.failMsg = errData.msg
        this.isLoginFail = true
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
.login {
  position: relative;
  height: 100%;
  color: #e5e5e5;
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    .login-title {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 3rem;
      color: #e5e5e5;
    }
  }
  &-content {
    margin: 0 auto;
    max-width: 360px;
    min-width: 300px;
    text-align: center;
    &-title {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 40px;
    }
    &-alert {
      margin-top: 8px;
      height: 65px;
    }
    .login-form-control {
      .ant-btn {
        margin-top: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.login {
  .ant-form-explain {
    color: #ffeb3b;
  }
}
</style>
