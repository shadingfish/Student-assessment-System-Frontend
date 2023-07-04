<template>
  <div class="header">
    <div class="header1">
      <a href="#">
        <img class="logo" src="../assets/pkulogo_white.png" alt="logo" />
      </a>
      <span class="divider"></span>
      <div class="title">学生综合测评系统</div>
    </div>
    <!-- <div>{{ name }}</div> -->
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import { getToken } from "@/utils/token";

export default {
  name: "AppHeader",
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = getToken("username");
  },
  methods: {
    logout() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 垂直居中 */
  color: #fff;

  .header1 {
    display: flex;
    direction: column;
    align-items: center;
  }

  .divider {
    width: 1px;
    height: 36px;
    background-color: #fff;
    margin: 0 10px;
  }

  .title {
    font-size: 24px;
  }

  .logo {
    width: auto;
    /* 调整图片宽度 */
    height: 50px;
    /* 保持图片高度自适应 */
    margin-top: 15px;
    margin-bottom: 10px;
    margin-right: 10px;

  }
}
</style>