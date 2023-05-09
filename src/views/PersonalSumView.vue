<template>
  <div class="st-table">
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
      studentData: [
        {
          id: "2200022XXX", // 学号
          name: "王大鹏", // 姓名
          grade: 2022, // 年级
          major: "软件工程", // 专业
          url: "2200022XXX-王大鹏-个人学年总结", // 个人学年总结文件
          score: "暂未评分" // 个人学年总结评分
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