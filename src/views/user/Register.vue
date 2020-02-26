<template>
  <div class="main register">
    <h3><span>注册</span></h3>
    <a-alert v-if="isRegisterFail"
             :message="failMsg"
             type="error"
             showIcon
             style="margin-bottom: 24px;" />
    <a-form id="formLogin"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit">
      <!-- 邮箱 -->
      <a-form-item>
        <a-input size="large"
                 type="text"
                 placeholder="邮箱"
                 v-decorator="[
        'email',
        {rules: [{ required: true,type:'email', message: '请输入邮箱地址' }], validateTrigger: ['change','blur']}]">
          <a-icon slot="prefix"
                  type="mail"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <!-- 密码 -->
      <a-popover placement="rightTop"
                 trigger="click"
                 :visible="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：<span>{{ passwordLevelName }}</span></div>
            <a-progress :percent="state.percent"
                        :showInfo="false"
                        :strokeColor=" passwordLevelColor " />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input size="large"
                   type="password"
                   @click="handlePasswordInputClick"
                   autocomplete="false"
                   placeholder="至少6位密码，区分大小写"
                   v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]">
            <a-icon slot="prefix"
                    type="lock"
                    :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
      </a-popover>
      <!-- 确认密码 -->
      <a-form-item>
        <a-input size="large"
                 type="password"
                 autocomplete="false"
                 placeholder="确认密码"
                 v-decorator="[
                'password2',
                {rules: [{ required: true, message: '请输入密码' },{ validator: this.handlePasswordCheck }], validateTrigger: ['change','blur']}
              ]">
          <a-icon slot="prefix"
                  type="lock"
                  :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <!-- 手机号码 -->
      <!-- <a-form-item>
        <a-input size="large" placeholder="11 位手机号" v-decorator="['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item> -->
      <!-- 验证码 -->
      <!-- <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button class="getCaptcha" size="large" :disabled="state.smsSendBtn" @click.stop.prevent="getCaptcha" v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
        </a-col>
      </a-row> -->
      <!-- 确定按钮 -->
      <a-form-item>
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="register-button"
                  :loading="registerBtn"
                  @click.stop.prevent="handleSubmit"
                  :disabled="registerBtn">注册
        </a-button>
      </a-form-item>
      <div class="user-register-other">
        <router-link class="login"
                     :to="{ name: 'login' }">使用已有账户登录</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { notification, Row, Col, Form, Input, Checkbox, Button, Icon, Alert, Select, Popover, Progress } from 'ant-design-vue'
import { Register } from '@/api/auth'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  name: 'register',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Alert.name]: Alert,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Popover.name]: Popover,
    [Progress.name]: Progress
  },
  data() {
    return {
      form: Form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false,
      isRegisterFail: false
    }
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {

    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck(rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },

    handlePasswordInputClick() {
      // if (!this.isMobile()) {
      //   this.state.passwordLevelChecked = true
      //   return
      // }
      this.state.passwordLevelChecked = true
    },

    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this
      this.isRegisterFail = false
      this.failMsg = ''
      state.loginBtn = true

      // const validateFieldsKey = ['username', 'password']

      validateFields((err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams.username = values.username
          loginParams.password = md5(values.password)
          Register(loginParams)
            .then((res) => this.loginSuccess(loginParams))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            // state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess(values) {
      this.$router.push({ name: 'registerResult', params: { ...values } })
    },
    requestFailed(err) {
      this.failMsg = err.response.data.message
      this.isRegisterFail = true
      notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-button {
  width: 100%;
}
.user-register-other {
  .login {
    float: right;
  }
}
</style>
