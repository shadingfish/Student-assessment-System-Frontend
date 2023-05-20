<template>
  <div class="header">
      <div class="title">学生综合测评系统</div>
      <div>{{ name }}</div>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'

export default {
  name: 'AppHeader',
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = getToken('username')
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  .title {
    font-size: 24px;
  }
}
</style>