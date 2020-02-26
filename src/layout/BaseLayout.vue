<template>
  <div class="main baselayout">
    <div class="header">
      <!-- <slot name="header"></slot> -->
      <z-header></z-header>
    </div>
    <div class="content container">
      <router-view></router-view>
    </div>
    <div class="footer">
      <!-- <slot name="footer"></slot> -->
      <z-footer></z-footer>
    </div>
  </div>
</template>

<script>
import { Header, Footer } from '../components'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([Header, Footer])

export default {
  name: 'BaseLayout',
  components: comps
}
</script>

<style lang="scss" scoped>
.baselayout {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100%;
  background-color: #f0f2f5;
  .content {
    flex-grow: 1;
  }
}
</style>
