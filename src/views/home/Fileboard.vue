<template>
  <div class="fileboard">
    <div class="fileboard-header">
      <span class="fileboard-header-title">图片</span>
    </div>
    <div class="fileboard-content">
      <!-- 列表 -->
      <template v-for="(fileItem, index) in list">
        <a-spin :key="'spin'+fileItem.name+index"
                :spinning="!!fileItem.loading">
          <card-float class="file-item"
                      :key="fileItem._id">
            <image-item :name="fileItem.name"
                        :url="fileItem.url"
                        :key="'image-file-'+index"
                        @remove="onRemove(fileItem)">
            </image-item>
          </card-float>
        </a-spin>
      </template>
      <!-- 上传中 -->
      <template v-for="(uploadItem,index) in uploadList">
        <image-upload v-bind="uploadItem"
                      :key="'upload_'+uploadItem.file.uid+index"
                      @success="onUploadSuccess"
                      @error="onUploadError"></image-upload>
      </template>
      <!-- upload control -->
      <upload-card @add="handleAddImg"></upload-card>
    </div>
  </div>
</template>

<script>
import { Icon, Spin, message } from 'ant-design-vue'
import { CardFloat, UploadCard, ImageUpload, ImageItem } from '@/components'
import { listType, list } from '@/api/folder'
import { remove } from '@/api/file'
import { getComponentRegister } from '@/utils/componentUtil'

const antdComps = getComponentRegister([Icon, Spin, CardFloat, UploadCard, ImageUpload, ImageItem])

export default {
  name: 'Fileboard',
  components: antdComps,
  props: {
    baseDir: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseFolder: null,
      list: [],
      uploadList: []
    }
  },
  watch: {
    baseDir: {
      immediate: true,
      handler(val) {
        this.getFileList(val)
      }
    }
  },
  methods: {
    getFileList() {
      list(this.baseDir, listType.file).then(res => {
        this.baseFolder = res.data.baseDir
        this.list = res.data.fileList
      }).catch(err => {
        console.log(err)
      })
    },
    handleAddImg(file) {
      this.uploadList.push({
        dir: this.baseFolder.id,
        file
      })
    },
    onUploadSuccess({ file, res }) {
      this.uploadList.splice(this.uploadList.findIndex(item => item.file === file), 1)
      this.list.push(res.data)
      message.success(`图片[${file.name}]上传成功！`)
    },
    onUploadError({ file, err }) {
      console.log(err)
      message.error(`图片[${file.name}]上传失败！`)
    },
    // 删除图片
    onRemove(fileItem) {
      fileItem.operating = true
      if (!fileItem.loading) {
        this.$set(fileItem, 'loading', true)
      }
      remove(fileItem.id).then(item => {
        const index = this.list.findIndex(file => file.id === fileItem.id)
        if (index !== -1) {
          this.list.splice(index, 1)
        }
        message.success('删除成功！')
      }).catch(err => {
        console.log(err)
        message.error('删除失败！')
      }).finally(() => {
        fileItem.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fileboard {
  padding: 16px;
  &-header {
    padding: 8px 0;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    .card-float {
      margin: 8px 16px;
      width: 240px;
      // height: 180px;
    }
    .upload-card {
      margin: 8px 16px;
      width: 240px;
    }
    .image-upload {
      margin: 8px 16px;
      width: 240px;
    }
  }
}
</style>
