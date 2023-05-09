<template>
  <div class="st-table">
    <el-table :data="studentData" border style="width: 100%">
      <el-table-column prop="id" label="学号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
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
      <el-table-column prop="gpa" label="绩点">
        <template slot-scope="scope">
          {{ scope.row.gpa.toFixed(1) }}
        </template>
      </el-table-column>
      <el-table-column prop="volun" label="志愿时长">
        <template slot-scope="scope">
          {{ scope.row.volun }} h
        </template>
      </el-table-column>
      <el-table-column prop="sciRes" label="科研加分">
        <template slot-scope="scope">
          {{ scope.row.sciRes }}
        </template>
      </el-table-column>
      <el-table-column prop="award" label="竞赛加分">
        <template slot-scope="scope">
          {{ scope.row.award }}
        </template>
      </el-table-column>
      <el-table-column prop="stuService" label="学生服务">
        <template slot-scope="scope">
          {{ scope.row.stuService }}
        </template>
      </el-table-column>
      <el-table-column prop="socialPrac" label="社会实践">
        <template slot-scope="scope">
          {{ scope.row.socialPrac }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px">
      <el-button type="primary">导出</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentData: [
        {
          id: "2200022XXX", // 学号
          name: "王大鹏", // 姓名
          grade: 2022, // 年级
          major: "软件工程", // 专业
          gpa: 3.0, // 绩点
          volun: 10, // 志愿时长
          sciRes: 5, // 科研加分
          award: 5, // 竞赛加分
          stuService: 3, // 学生服务
          socialPrac: 5 // 社会实践
        }
      ],
    };
  },
  methods: {
    edit(row) {
      row.iseditor = true;
    },
    save(row) {
      row.iseditor = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.st-table {
  padding: 10px;
}
</style>