<template>
  <div class="st-table">
    <el-table :data="studentData" border style="width: 100%">
      <el-table-column prop="id" label="学号">
        <template slot-scope="scope">
          {{ scope.row.card_id }}
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
      <el-table-column prop="grade" label="专业">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column prop="major" label="评审状态">
        <template slot-scope="scope">
          {{ scope.row.eval_status }}
        </template>
      </el-table-column>
      <el-table-column prop="gpa" label="学习成绩">
        <template slot-scope="scope">
          {{ scope.row.gpa_score}}
        </template>
      </el-table-column>
      <el-table-column prop="volun" label="个人报告成绩">
        <template slot-scope="scope">
          {{ scope.row.report_score }}
        </template>
      </el-table-column>
      <el-table-column prop="sciRes" label="志愿服务成绩">
        <template slot-scope="scope">
          {{ scope.row.volun_score }}
        </template>
      </el-table-column>
      <el-table-column prop="award" label="学生岗位成绩">
        <template slot-scope="scope">
          {{ scope.row.occup_score }}
        </template>
      </el-table-column>
      <el-table-column prop="stuService" label="科研成果成绩">
        <template slot-scope="scope">
          {{ scope.row.research_score }}
        </template>
      </el-table-column>
      <el-table-column prop="socialPrac" label="竞赛获奖成绩">
        <template slot-scope="scope">
          {{ scope.row.award_score }}
        </template>
      </el-table-column>
      <el-table-column prop="socialPrac" label="社会实践成绩">
        <template slot-scope="scope">
          {{ scope.row.practice_score }}
        </template>
      </el-table-column>
      <el-table-column prop="socialPrac" label="最终得分">
        <template slot-scope="scope">
          {{ scope.row.final_score }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:10px">
      <el-button type="primary" @click="getTable('eval_results')">导出汇总表</el-button>
      <el-button type="primary" @click="getTable('eval_records')">导出评审细节表</el-button>
    </div>
  </div>
</template>
<script>
import {exportTable} from "@/yudingyi/api/exportExcel";
import axios from "axios";

export default {
  data() {
    return {
      studentData: [],
    };
  },
  mounted() {
    console.log('通过接口获取学生汇总信息，json格式');
    axios.get('http://localhost:20235/export/view')
        .then(response => {
              console.log('学生汇总信息 获取成功', response);
              this.studentData = response.data;
              console.log(this.studentData);
            }
        )
        .catch(error => console.log('学生汇总信息', error));
  },
  methods: {
    edit(row) {
      row.iseditor = true;
    },
    save(row) {
      row.iseditor = false;
    },
    getTable(table_name){
      console.log('通过接口获取表格');
      exportTable(table_name)
          .then (response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                let file_name = table_name + '.xlsx';
                link.setAttribute('download', file_name);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                alert("导出成功" + table_name);
              }
          )
          .catch(error => console.error('导出Excel失败:', error));
    },
  }
};
</script>
<style lang="scss" scoped>
.st-table {
  padding: 10px;
}
</style>
