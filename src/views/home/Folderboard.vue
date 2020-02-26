<template>
  <div class="folderboard">
    <div class="folderboard-header">
      <span class="folderboard-header-title">文件夹</span>
    </div>
    <div class="folderboard-content">
      <template v-for="folder in list">
        <a-spin :key="'spin'+folder.name"
                :spinning="!!folder.loading">
          <card-float :key="folder.name">
            <folder-item :name="folder.name"
                         @click="handleFolderClick(folder)"
                         @remove="onFolderRemove(folder)">
            </folder-item>
          </card-float>
        </a-spin>
      </template>
      <card-float>
        <div class="btn-addfolder"
             @click="showFolderModal">
          <span>
            <a-icon type="plus"
                    class="icon-folder-add" />
          </span>
        </div>
      </card-float>
    </div>
    <div class="folder-modal">
      <a-modal title="新建文件夹"
               :visible="state.folderModalVisible"
               @ok="handleOk"
               :confirmLoading="state.confirmLoading"
               @cancel="handleCancel">
        <a-form :form="form">
          <a-form-item label="名称"
                       :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入文件夹名称!' }]}
        ]" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Form, Input, Spin, Modal, message } from 'ant-design-vue'
import { CardFloat, FolderItem } from '@/components'
import { getComponentRegister } from '@/utils/componentUtil'
import { listType, list, create, remove } from '@/api/folder'/*, remove, rename */

const antdComps = getComponentRegister([Row, Col, CardFloat, FolderItem, Icon, Form, Form.Item, Input, Spin, Modal])

export default {
  name: 'Folderboard',
  components: antdComps,
  props: {
    baseDir: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      form: Form.createForm(this),
      state: {
        folderModalVisible: false,
        confirmLoading: false
      }
    }
  },
  watch: {
    baseDir: {
      immediate: true,
      handler(val) {
        this.getFolderList()
      }
    }
  },
  methods: {
    getFolderList() {
      list(this.baseDir, listType.folder).then(res => {
        this.list = res.data.folderList
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击文件夹，进入
    handleFolderClick(folder) {
      const tarDir = this.baseDir + (this.baseDir === '/' ? '' : '/') + folder.name
      this.$router.push({ name: 'list', query: { path: tarDir } })
    },
    // 删除文件夹
    onFolderRemove(folder) {
      const { id: folderId } = folder
      if (!folder.loading) {
        this.$set(folder, 'loading', true)
      }
      remove(folderId).then(res => {
        message.success('删除文件夹成功！')
      }).catch(err => {
        console.log(err)
        message.success('删除文件夹失败！')
      }).finally(() => {
        folder.loading = false
        this.getFolderList()
      })
    },
    showFolderModal() {
      this.state.folderModalVisible = true
    },
    // 确认创建文件夹
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.state.confirmLoading = true
          const name = values.name
          const baseDir = this.baseDir
          create(baseDir, name).then((res) => {
            this.state.confirmLoading = false
            this.state.folderModalVisible = false
            if (res.command === 0) {
              this.getFolderList()
            }
          }).catch(err => {
            this.state.confirmLoading = false
            this.state.folderModalVisible = false
            console.log(err.message)
            message.error('创建失败，请重试！')
          })
        }
      })
    },
    handleCancel(e) {
      this.state.folderModalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.folderboard {
  padding: 16px;
  &-header {
    padding: 8px 0;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    .card-float {
      margin: 8px 16px;
      width: 180px;
    }
    .btn-addfolder {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
}
</style>
