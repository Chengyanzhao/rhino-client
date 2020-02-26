<template>
  <div class="about">
    <mark-down :markdown="mdText"></mark-down>
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import { getComponentRegister } from '@/utils/componentUtil'

const comps = getComponentRegister([MarkDown])

const mdText = `
# 犀牛图床
写犀牛图床的初衷，是因为自己写博客的时候图片不好存放。常用的几个图床，如smms，不易管理图片，上传图片之后如果不记住图片地址，图片就丢失了。虽然上传功能很方便，也不需要权限，但很难管理自己的图片。
另外，很可能你有很多博客，或者博客分类较多。我们会想在图床中创建文件夹，将图片通过文件夹的方式管理器起来。smms也无法为我们组织目录。
所以，我编写了这个带有管理工具的图床工具。

穷，是个问题，所以我不打算开放我的图床存储。如果你想使用他，按照搭建教程，将他部署在你的服务器上，配置你自己的对象存储。

## Tech

1. 对象存储：使用七牛云的对象存储，每个月有免费10G的空间，所以优先选择他。
2. 服务端：使用Express编写。
3. 前端：Vue生态 + AntD Vue。
4. 分层：
    - 在服务端，分为接口层和SDK层。接口层提供router，SDK层负责调度数据库，以及操作数据库。
    - 前端也差不多，分为API层和UI层，如果你不喜欢这个UI页面，完全废弃它，然后自己搭建，因为API层对接了服务端的接口层。

## Feature

1. 带有权限模块，每个用户管理自己的图片资源。
2. 文件夹功能，更方便的对你的图片资源归类。
3. 导出配置功能，你可以通过此功能导出所有资源的元数据。(Future)

## 搭建教程

1. 通过仓库，将前后端代码clone到服务器上。
2. 修改数据库连接地址。
3. 修改七牛云存储的key和secret。
4. 将前后端部署在服务器上，安装、构建、启动即可。

`

export default {
  name: 'About',
  components: comps,
  data() {
    return {
      mdText
    }
  }
}
</script>
