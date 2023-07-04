<template>
  <div class="menu">
    <el-aside width="200px">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu router class="el-menu-vertical-demo" :collapse="isCollapse">
        <template v-for="(item, index) in menu">
          <el-submenu v-if="!item.hidden" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in item.children"
              :key="index"
            >
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
import { getMenuByRoleIdApi } from "@/wangdy55/api";
export default {
  name: "AppMenu",
  data() {
    return {
      menu: [],
      isCollapse: true,
    };
  },
  created() {
    this.menu = [...this.$router.options.routes];
    this.getMenuByRoleId();
  },
  methods: {
    getMenuByRoleId() {
      getMenuByRoleIdApi().then((res) => {
        // this.menu = [...res.data.data]
        console.log("Menu: ", res.data.data);
      });
    },
  },
};
</script>

<style lang="scss">
.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
      text-align: left;
      .el-menu-item.is-active {
        background-color: #ecf5ff;
      }
      .el-menu-item-group__title {
        padding: 0;
      }
      .fa {
        margin: 10px;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-radio-group{
    margin: 10px 0;
  }
}
</style>