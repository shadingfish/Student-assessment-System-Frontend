<template>
  <div class="header">
      <a href="#">
        <img class="logo" src="../assets/pkulogo_white.png" alt="logo" />
      </a>
      <span class="divider"></span>
      <div class="title">学生综合测评系统</div>
    <div>{{ name }}</div>
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
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center; /* 垂直居中 */
  color: #fff;


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
    width: auto; /* 调整图片宽度 */
    height: 50px; /* 保持图片高度自适应 */
    margin-top:15px;
    margin-bottom:10px;
    margin-right:10px;

  }
}
</style>