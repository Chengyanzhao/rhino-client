<template>
  <div class="folder-item">
    <span class="folder-item-name"
          @click="onClick">
      <a-icon type="folder" />
      {{name}}
    </span>
    <span class="folder-item-control">
      <span class="folder-item-control-button close"
            @click="onRemoveClick">
        <a-icon type="close-circle"
                shape="circle" />
      </span>
      <!-- <a-button shape="circle"
                icon="close-circle"
                style="color: #888"
                size="small"
                @click="onRemoveClick" /> -->
    </span>
  </div>
</template>

<script>
import { Icon, Button } from 'ant-design-vue'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([Icon, Button])

export default {
  name: 'FolderItem',
  components: comps,
  props: {
    name: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click', name)
    },
    onRemoveClick() {
      this.$emit('remove', name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";
@import "@/assets/css/dimens.scss";

.folder-item {
  display: flex;
  padding: 10px;
  width: 100%;
  border-radius: $radiusSize;
  overflow: hidden;
  &-name {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-control {
    &-button {
      flex: 1 0 16px;
      display: inline-block;
      margin-left: 8px;
      width: 16px;
      cursor: pointer;
      i:hover {
        color: $selectColor;
      }
    }
  }
}
</style>
