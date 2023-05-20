<!-- 学生在线填报页面 -->
<template>
  <div class="report-container">
    <h2>成绩表</h2>
    <el-table>
      <el-table-column prop="term" label="学年" ></el-table-column>
      <el-table-column prop="gpa" label="GPA" ></el-table-column>
      <el-table-column prop="rank" label="排名" ></el-table-column>
    </el-table>

    <h2>志愿服务</h2>
    <el-table>
      <el-table-column prop="date" label="日期" ></el-table-column>
      <el-table-column prop="activity" label="活动名称" ></el-table-column>
      <el-table-column prop="duration" label="时长" ></el-table-column>
      <el-table-column prop="url" label="证明材料" ></el-table-column>
    </el-table>

    <h2>学生骨干服务岗位任职</h2>
    <el-table>
      <el-table-column prop="term" label="学年" ></el-table-column>
      <el-table-column prop="department" label="部门" ></el-table-column>
      <el-table-column prop="level" label="校级/院级" ></el-table-column>
      <el-table-column prop="occupation" label="职位" ></el-table-column>
      <el-table-column prop="url" label="证明材料" ></el-table-column>
    </el-table>

    <h2>科研成果</h2>
    <el-table>
      <el-table-column prop="type" label="成果类型" ></el-table-column>
      <el-table-column prop="time" label="产出时间" ></el-table-column>
      <el-table-column prop="level" label="成果等级" ></el-table-column>
      <el-table-column prop="url" label="证明材料" ></el-table-column>
    </el-table>

    <h2>竞赛获奖情况</h2>
    <el-table>
      <el-table-column prop="competition" label="竞赛名称" ></el-table-column>
      <el-table-column prop="time" label="时间" ></el-table-column>
      <el-table-column prop="level" label="竞赛级别" ></el-table-column>
      <el-table-column prop="award" label="获奖情况" ></el-table-column>
      <el-table-column prop="url" label="证明材料" ></el-table-column>
    </el-table>

    <h2>社会实践情况</h2>
    <el-table>
      <el-table-column prop="practice" label="实践名称" ></el-table-column>
      <el-table-column prop="start" label="起始时间" ></el-table-column>
      <el-table-column prop="end" label="结束时间" ></el-table-column>
      <el-table-column prop="content" label="实践内容" ></el-table-column>
      <el-table-column prop="url" label="证明材料" ></el-table-column>
    </el-table>

    <h2>个人学年总结</h2>
    <el-table :data="studentData" border style="width: 100%">
      <el-table-column prop="id" label="学号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="90">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="grade" label="年级">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column prop="url" label="个人学年总结">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column prop="score" label="评分">
        <template slot-scope="scope">
          <el-input v-model="scope.row.score" size="small" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentData: []
    }
  }
}
</script>

<style lang="scss">
.report-container {
  display: flex;
  flex-direction: column;
  align-items: start;
}

h2 {
  margin: 64px 0 0;
}

h2:nth-child(1) {
  margin: 0;
}
</style>