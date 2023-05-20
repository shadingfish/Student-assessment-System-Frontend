<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu router default-active="2">
        <template v-for="(item, index) in menus">
          <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
            <template slot="title">
              <!-- <i :class="item.iconClass"></i> -->
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.children" :key="index">
              <el-menu-item :index="child.path" :key="index">
                <!-- <i :class="child.iconClass"></i> -->
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'AppMenu',
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.menus = [...this.$router.options.routes]
  }
}
</script>

<style lang="scss">
.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
      text-align: left;
      .el-menu-item-group__title {
        padding: 0;
      }
      .fa {
        margin: 10px;
      }
    }
  }
}
</style>