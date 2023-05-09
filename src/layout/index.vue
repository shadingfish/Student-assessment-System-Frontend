<template>
  <div>
    <div class="sidebar">
      <el-menu class="el-menu-vertical-demo" align="left" default-active="/">
        <el-menu-item index="/" @click="$router.push('/')">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/about" @click="$router.push('/about')">
          <i class="el-icon-menu"></i>
          <span slot="title">关于</span>
        </el-menu-item>
        <!-- yudingyi -->
        <el-menu-item index="/about" @click="$router.push('/science_admin')">
            <i class="el-icon-menu"></i>
            <span slot="title">科研情况审核</span>
        </el-menu-item>
        <el-menu-item index="/about" @click="$router.push('/student_manage')">
            <i class="el-icon-menu"></i>
            <span slot="title">学工管理</span>
        </el-menu-item>
        <!-- wanglingyu -->
        <el-menu-item index="/grades" @click="$router.push('/gpa')">
          <i class="el-icon-menu"></i>
          <span slot="title">成绩填报</span>
        </el-menu-item>
        <el-menu-item index="/grade-eval" @click="$router.push('/gpa-eval')">
          <i class="el-icon-menu"></i>
          <span slot="title">成绩评审</span>
        </el-menu-item>
        <el-menu-item index="/stu-import" @click="$router.push('/stu-import')">
          <i class="el-icon-menu"></i>
          <span slot="title">导入学生名单</span>
        </el-menu-item>
        <!-- wuqile -->
        <el-menu-item index="/competition" @click="$router.push('/competition_admin')">
          <i class="el-icon-menu"></i>
          <span slot="title">竞赛状况审核</span>
        </el-menu-item>
        <el-menu-item index="/student_service" @click="$router.push('/student_service')">
          <i class="el-icon-menu"></i>
          <span slot="title">学工服务审核</span>
        </el-menu-item>
        <!-- wangdy -->
        <el-menu-item index="/summary" @click="$router.push('/summary')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">成绩汇总</span>
        </el-menu-item>
        <el-menu-item index="/personalSum" @click="$router.push('/personalSum')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">个人总结评分</span>
        </el-menu-item>
        <!-- mxh -->
        <el-menu-item index="/social_practice" @click="$router.push('/social_practice')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">社会实践</span>
        </el-menu-item>
        <el-menu-item index="/Volunteer_service" @click="$router.push('/Volunteer_service')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">志愿服务</span>
        </el-menu-item>
        <!-- 学生在线填报 -->
        <el-menu-item index="/report" @click="$router.push('/report')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">在线填报</span>
        </el-menu-item>
      </el-menu>

      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
};
</script>


<style lang="scss" scoped>
.sidebar {
  display: flex;
  height: 100vh;

  .el-menu-item.is-active {
    background-color: #eee;
  }
}

.main {
  flex: 1;
  padding: 20px;
}
</style>