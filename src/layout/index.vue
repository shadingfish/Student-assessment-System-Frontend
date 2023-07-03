<template>
  <el-container class="layout">
    <el-header class="header" height="75px"><Header /></el-header>
    <el-container class="container">
      <el-aside>
        <Menu />
      </el-aside>
      <el-main>
        <el-card>
          <BreadCrumb />
        </el-card>
        <div class="main">
          <router-view />
        </div>
      </el-main>
    </el-container>
    <!-- <el-footer><Footer /></el-footer> -->
  </el-container>
</template>

<script>
import Menu from "@/layout/Menu";
import Header from "@/layout/Header";
// import Footer from "@/layout/Footer";
import BreadCrumb from "@/components/kits/BreadCrumb";

export default {
  name: "AppLayout",
  components: { Menu, Header, BreadCrumb },
};
</script>

<style lang="scss">
.layout {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  .main {
    margin: 20px 0;
  }
}

.header{
  background-color: #94070a;  
}

.el-aside{
  background-color: rgb(255, 251, 246);
}

.container{
  background-color: rgb(255, 251, 246);
}
</style>