<template>
  <div class="markdown"
       v-html="html"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
  name: 'MarkDown',
  props: {
    markdown: {
      type: String
    }
  },
  computed: {
    html() {
      return md.render(this.markdown)
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown {
  padding: 16px;
}
</style>
