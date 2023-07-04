<!-- 学生在线填报页面 -->
<template>
  <div class="report-container">
    <div class="report-container" style="width:70vw; background-color: rgba(178,180,178,0.16)">

      <h2>于丁一接口</h2>
      <br>
      <span style="color: crimson">注：</span>
      <span>不同的功能接口，麻烦自行与home菜单拼合，并为每个接口（除退出登录外）增加返回按键</span>
      <br>
      <el-button @click="logout" >退出登录</el-button>
      <el-button @click="$router.push({ path: '/admin/output' })" >导出界面</el-button>
      <el-button @click="$router.push({ path: '/researchReport' })" >进入填报科研情况页面</el-button>
      <el-button @click="$router.push({ path: '/researchEval' })" >进入科研评委打分页面</el-button>
      <el-button @click="$router.push({ path: '/practiceReport' })" >进入填报实践情况页面</el-button>
      <el-button @click="$router.push({ path: '/practiceEval' })" >进入实践评委打分页面</el-button>
    </div>

    
</template>

<script>

export default {
  data() {
    return {
      studentData: [],
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      location.reload();
    }
  },
}
</script>

<style lang="scss">
.report-container {
  margin: 1em;
  padding: 1em;
  display: flex;
  align-items: start;
  flex-direction: column;
}

el-form-item {
  align-items: flex-start;
}

.input-suffix {
  margin: auto;
  border: 0.5em;
  display: flex;
  align-items: start;
  span {
    text-align:left;
    min-width: 8em;
    max-width: 8em;
  }
}

h2 {
  margin: 64px 0 0;
  font-weight: bold;
}

h2:nth-child(1) {
  margin: 0;
}

.tableBar {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}

.tableLab .span-btn {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  padding: 0 20px;
  color: #818693;
  border-right: solid 1px #d8dde3;
}

.tableLab .el-button{
  margin-left: 10px;
}


</style>
