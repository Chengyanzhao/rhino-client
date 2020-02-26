<template>
  <div class="z-header">
    <div class="container">
      <div class="z-header-wrapper">
        <div class="z-header-left">
          <div class="logo top-nav-header">
            <a href="/">
              <img src="@/assets/logo.png"
                   alt="logo">
              <h1 class="title">犀牛图床</h1>
            </a>

          </div>
          <a-menu v-model="current"
                  mode="horizontal"
                  @select="onMenuSelect">
            <a-menu-item key="list">
              <a-icon type="home" />我的图床
            </a-menu-item>
            <a-menu-item key="about">
              <a-icon type="tag" />关于
            </a-menu-item>
            <a-menu-item key="github">
              <a href="https://ant.design"
                 target="_blank"
                 rel="noopener noreferrer">
                <a-icon type="link"></a-icon>Github
              </a>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="z-header-right">
          <div class="user-wrapper">
            <div class="content-box">
              <a-dropdown class="action user-dropdown-menu">
                <span class="ant-dropdown-link">
                  <a-avatar style="backgroundColor:#87d068"
                            icon="user"
                            size="small" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">个人中心</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">账户设置</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;"
                       @click="onLogoutClick">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dropdown, Menu, Icon, Avatar } from 'ant-design-vue'
import { mapActions } from 'vuex'

export default {
  name: 'ZHeader',
  components: {
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Icon.name]: Icon,
    [Avatar.name]: Avatar
  },
  data() {
    return {
      current: ['mail']
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ name }) {
        this.current = [name]
      }
    }
  },
  methods: {
    ...mapActions(['Logout']),
    onMenuSelect({ item, key, selectedKeys }) {
      if (key === 'github') {
        return
      }
      this.$router.push({ name: key })
    },
    // 退出
    onLogoutClick() {
      const vm = this
      this.Logout().then(() => {
        vm.$router.replace({ name: 'login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";
.z-header {
  background: $mainColor;
  height: 64px;
  line-height: 64px;
  &-wrapper {
    display: flex;
    padding: 0 50px;
    .z-header-left {
      display: flex;
      flex: 0 1 1000px;
      .logo.top-nav-header {
        flex: 0 0 165px;
        overflow: hidden;
        img {
          width: 48px;
          height: 48px;
        }
        .title {
          display: inline-block;
          vertical-align: top;
          font-size: 18px;
          margin: 0 0 0 12px;
          font-weight: 500;
          color: $hintColor;
        }
      }
      .ant-menu {
        margin-left: 36px;
        padding: 0 16px;
        max-width: 835px;
        flex: 0 1 835px;
        border: none;
        height: 64px;
        line-height: 64px;
        background-color: transparent;
        .ant-menu-item {
          color: $hintColor;
          &:hover {
            color: $hoverColor;
          }
          &-selected {
            font-weight: 500;
            color: $selectColor;
          }
          a {
            color: $hintColor;
          }
          // &-selected,
          // a {
          //   // color: $hoverColor;
          // }
        }
      }
    }
    .z-header-right {
      flex: 1 0 auto;
      height: 64px;
      overflow: hidden;
      .user-wrapper {
        .content-box {
          .user-dropdown-menu {
            cursor: pointer;
            display: inline-block;
            height: 100%;
            color: #fff;
            .ant-avatar {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
