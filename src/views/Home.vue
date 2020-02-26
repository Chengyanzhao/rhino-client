<template>
  <div class="home">
    <div class="content">
      <div class="content-breadcrumb">
        <folder-breadcrumb :routes="routes"></folder-breadcrumb>
      </div>
      <div class="content-resource">
        <div class="content-resource-item content-resource-folderboard">
          <folderboard :baseDir="baseDir"></folderboard>
        </div>
        <div class="content-resource-item content-resource-fileboard">
          <fileboard :baseDir="baseDir"></fileboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FolderBreadcrumb from './home/FolderBreadcrumb'
import Folderboard from './home/Folderboard'
import Fileboard from './home/Fileboard'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([FolderBreadcrumb, Folderboard, Fileboard])

const rootDir = {
  path: '/',
  name: '全部文件'
}

export default {
  name: 'home',
  components: comps,
  props: {
    path: {
      type: String
    }
  },
  data() {
    return {
      baseFolder: null
    }
  },
  computed: {
    baseDir() {
      return this.path
    },
    routes() {
      const result = this.path.split('/').filter(item => !!item).map(item => {
        return {
          path: item,
          breadcrumbName: item
        }
      })
      result.unshift({
        path: rootDir.path,
        breadcrumbName: rootDir.name
      })
      return result
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home {
  .content {
    padding: 20px 10px;
    .content-resource-item {
      margin: 8px 0;
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
