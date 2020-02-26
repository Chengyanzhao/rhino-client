<template>
  <div class="test">
    <background></background>
  </div>
</template>

<script>
import { Background } from '@/components'

export default {
  name: 'Test',
  components: {
    [Background.name]: Background
  }
}
</script>

<style lang="scss" scoped>
.test {
  height: 100%;
}
</style>
