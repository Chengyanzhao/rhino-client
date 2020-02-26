<template>
  <div class="image-item">
    <div class="content">
      <span class="delete-button"
            @click="onRemove">
        <a-icon type="close-circle"
                shape="circle"
                theme="twoTone" />
      </span>
      <img :src="url"
           :alt="name"
           :width="width"
           :height="height"
           @click="onViewBigImg()">
      <!-- <div class="cover">
        <slot></slot>
      </div> -->
    </div>
    <div class="footer">
      <div class="meta">
        <span class="name">{{name}}</span>
      </div>
      <div class="footer-control">
        <span class="footer-control-btn btn-copy"
              v-animate
              @click="copyUrl">
          <a-icon type="copy"
                  theme="twoTone"
                  twoToneColor="#52c41a" />
        </span>
        <span class="footer-control-btn btn-copymarkdown"
              v-animate
              @click="copyMarkDown">
          <a-icon type="snippets"
                  theme="twoTone"
                  twoToneColor="#52c41a" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal } from 'ant-design-vue'
import { copyToClipboard } from '@/utils/domUtil'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([Button, Icon])

export default {
  name: 'ImageItem',
  components: comps,
  props: {
    name: {
      type: String,
      default: 'Title'
    },
    url: {
      type: String,
      default: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    isUploading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      bodyStyle: {
        width: '80%',
        minWidth: '300px'
      }
    }
  },
  methods: {
    // 查看大图
    onViewBigImg() {
      const h = this.$createElement
      Modal.info({
        title: this.name,
        width: '400px',
        class: 'model-big-img',
        content: h('div', {}, [
          h('img', { attrs: { src: this.url, width: '100%' } })
        ]),
        onOk() { }
      })
    },
    onRemove() {
      this.loading = true
      this.$emit('remove', {})
      this.loading = false
    },
    copyUrl() {
      const url = this.url
      copyToClipboard(url)
    },
    copyMarkDown() {
      const name = this.name
      const url = `![${name}](${this.url})`
      copyToClipboard(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/dimens.scss";

.image-item {
  position: relative;
  border-radius: $radiusSize;
  overflow: hidden;
  .content {
    position: relative;
    .delete-button {
      position: absolute;
      right: 5px;
      top: 5px;
      i {
        font-size: 18px;
        &:hover {
          font-size: 20px;
        }
      }
    }
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .operate-content {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
      .btn-copy {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 8px;
    .meta {
      display: inline-block;
    }
    &-control {
      &-btn {
        position: relative;
        margin: 0 2px;
        padding: 0 4px;
        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.model-big-img {
  width: 80%;
  min-width: 400px;
}
</style>
