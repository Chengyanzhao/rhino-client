<template>
  <div class="upload-card"
       :class="{shake:shake}">
    <a-upload-dragger name="file"
                      :showUploadList="false"
                      :accept="accept"
                      :multiple="true"
                      action="//jsonplaceholder.typicode.com/posts/"
                      :customRequest="handleUpload">
      <p class="ant-upload-drag-icon">
        <a-icon type="cloud-upload" />
      </p>
      <p class="ant-upload-text">点击或拖动图片到此区域上传</p>
      <p class="ant-upload-hint">支持多文件(单个图片最大5MB)</p>
    </a-upload-dragger>
  </div>
</template>

<script>
import { message, Row, Col, Tree, Breadcrumb, Button, Modal, Form, Input, Card, Icon, Upload } from 'ant-design-vue'
import { getComponentRegister } from '../../utils/componentUtil'

const acceptTypes = ['jpeg', 'jpg', 'png', 'gif', 'bmp']
const antComps = getComponentRegister([message, Row, Col, Tree, Breadcrumb, Button, Modal, Form, Input, Card, Icon, Upload.Dragger])

export default {
  name: 'UploadCard',
  components: antComps,
  props: {
    folderId: {
      type: String
    },
    limit: {
      type: Number,
      default: 5 * 1024 * 1024
    }
  },
  data() {
    return {
      accept: acceptTypes.map(item => '.' + item).join(','),
      uploadList: [],
      shake: false
    }
  },
  methods: {
    handleUpload(uploadEvent) {
      if (uploadEvent.file.size > this.limit) {
        this.shake = true
        message.error('单个图片最大支持5MB!')
        return
      }
      this.$emit('add', uploadEvent.file)
    }
  }
}

</script>
