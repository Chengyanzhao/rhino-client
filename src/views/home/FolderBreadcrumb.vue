<template>
  <div class="folder-breadcrumb">
    <a-breadcrumb :routes="innerRoutes">
      <template slot="itemRender"
                slot-scope="{route, params, routes, paths}">
        <!-- 最后一位 -->
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{route.breadcrumbName}}
        </span>
        <router-link v-else
                     :to="{ name: 'list', query: {path: getPath(paths)}}">
          {{route.breadcrumbName}}
          <!-- {{paths.map(item=>JSON.stringify(item))}} -->
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'
import { getComponentRegister } from '../../utils/componentUtil'

const antdComps = getComponentRegister([Breadcrumb])

const baseRoute = {
  path: '//',
  breadcrumbName: '全部文件'
}

function validatorRouteItem(route) {
  return !!(route && route.path && route.breadcrumbName)
}

export default {
  name: 'FolderBreadcrumb',
  components: antdComps,
  props: {
    routes: {
      type: Array,
      default: () => [baseRoute],
      validator(val) {
        return val.every(item => {
          return validatorRouteItem(item)
        })
      }
    }
  },
  computed: {
    innerRoutes() {
      return this.routes
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getPath(paths) {
      let pathString = paths.join('/')
      if (!pathString.startsWith('/')) {
        pathString = '/' + pathString
      }
      return pathString
    }
  }
}
</script>
