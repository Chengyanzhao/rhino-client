<template>
  <div class="image-upload">
    <image-item :url="dataUrl"
                :name="file.name">
      <div class="upload-control">
        <a-progress :percent="percent"
                    status="active" />
      </div>
    </image-item>
  </div>
</template>

<script>
import { Progress } from 'ant-design-vue'
import { ImageItem } from '@/components'
import { upload } from '@/api/file'
export default {
  name: 'ImageUpload',
  components: {
    [Progress.name]: Progress,
    [ImageItem.name]: ImageItem
  },
  props: {
    file: {
      type: File,
      required: true
    },
    dir: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      percent: 0,
      uploadStatus: 'active',
      dataUrl: ''
    }
  },
  mounted() {
    this.getFileUrl(this.file)
    this.uploadImg(this.file, this.dir, this.progressCb)
  },
  methods: {
    getFileUrl(file) {
      const vm = this
      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        vm.dataUrl = reader.result
      })
      reader.readAsDataURL(file)
    },
    uploadImg(file, dir, progressCb) {
      upload(file, dir, progressCb).then(res => {
        this.$emit('success', { file: this.file, res })
      }).catch(err => {
        this.$emit('error', { file: this.file, err })
      })
    },
    progressCb(current, total) {
      let percent
      if (current === total) {
        percent = 100
        this.uploadStatus = 'success'
      } else {
        percent = Math.round(current * 100 / total)
        this.uploadStatus = 'active'
      }
      this.percent = percent
    }
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  .upload-control {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
