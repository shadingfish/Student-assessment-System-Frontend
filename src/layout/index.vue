<template>
    <el-container class="layout">
      <el-header><Header /></el-header>
      <el-container>
        <Menu />
        <el-main>
          <BreadCrumb />
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
      <el-footer><Footer /></el-footer>
    </el-container>
</template>

<script>
import Menu from '@/layout/Menu'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import BreadCrumb from '@/layout/BreadCrumb'

export default {
  name: 'AppLayout',
  components: { Menu, Header, Footer, BreadCrumb },

}
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
</style>