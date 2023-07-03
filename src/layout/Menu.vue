<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu router>
        <template v-for="(item, index) in menu">
          <el-submenu v-if="!item.hidden" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.children" :key="index">
              <el-menu-item :index="child.path" :key="index">
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
import { getMenuByRoleIdApi } from '@/wangdy55/api'
export default {
  name: 'AppMenu',
  data() {
    return {
      menu: []
    }
  },
  created() {
    this.menu = [...this.$router.options.routes]
    this.getMenuByRoleId()
  },
  methods: {
    getMenuByRoleId() {
      getMenuByRoleIdApi().then(res => {
        // this.menu = [...res.data.data]
        console.log("Menu: ", res.data.data)
      })
    }
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
      .el-menu-item.is-active {
        background-color: #ECF5FF;
      }
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