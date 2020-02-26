<template>
  <div class="card-float">
    <slot>content</slot>
  </div>
</template>

<script>
export default {
  name: 'CardFloat',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.card-float {
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border: 1px solid rgba(0, 0, 0, 0.09);
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    border-color: rgba(0, 0, 0, 0.09);
    transform: translateY(-4px);
  }
}
</style>
