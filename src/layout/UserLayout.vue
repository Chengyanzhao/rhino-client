<template>
  <div class="userlayout">
    <background></background>
    <div class="content container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background'

export default {
  name: 'userlayout',
  components: { Background }
}
</script>

<style lang="scss" scoped>
.userlayout {
  display: flex;
  min-height: 100%;
  .content {
    flex-grow: 1;
    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}
</style>
