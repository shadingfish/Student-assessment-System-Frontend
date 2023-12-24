<!-- 个人学年总结评审页面 -->
<template>
  <div class="sum-eval">
    <el-table :data="evalRecords" border style="width: 100%">
      <el-table-column prop="student.cardId" label="学号"></el-table-column>
      <el-table-column prop="student.name" label="姓名"></el-table-column>
      <el-table-column prop="student.grade" label="年级"></el-table-column>
      <el-table-column prop="student.major" label="专业"></el-table-column>
      <el-table-column prop="student.class" label="班级"></el-table-column>
      <el-table-column prop="evalStatus" label="审核状态"></el-table-column>
      <el-table-column prop="score" label="分数">
        <template slot-scope="scope">
            {{ scope.row.evalStatus === '待审核' ? '未评分' : scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"
            @click="edit(scope.row)">
            评分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="el-dialog-view" title="个人学年总结" :visible.sync="dialogVisible" width="800px">
      <div class="form">
        <h1>学生个人信息</h1>
        <el-form :model="student" labelWidth="80px" :disabled="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" prop="cardId">
                <el-input :value="student.cardId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input :value="student.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年级" prop="grade">
                <el-input :value="student.grade"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业" prop="major">
                <el-input :value="student.major"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="班级/学苑" prop="class">
                <el-input :value="student.class"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="text-align: left;">
              <el-form-item label="评审状态" prop="evalStatus">
                <el-tag :type="form.evalStatus == '已审核' ? 'success' : 'warning'" size="medium">{{ form.evalStatus }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <h1>个人学年总结</h1>
        <template v-for="(item, key, index) in summary">
          <div class="summary-item" :key="key">
            <h3>{{ index + 1  + '. ' + summaryCol[index]}}</h3>
            <el-input class="content"
              type="textarea" :autosize="{ minRows: 10, maxRows: 20 }" :value="item">
            </el-input>
          </div>
        </template>

        <h1>审核评分</h1>
        <el-form :model="form" :rules="rules" ref="form" labelWidth="80px">
          <el-form-item label="评分" prop="score">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm('form')">取消</el-button>
        <el-button type="primary" @click="submit('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getSummaryRecordApi, putSummaryRecordApi } from '@/wangdy55/api'
import { summaryApis } from '@/wangdy55/api';
export default {
  data() {
    return {
      dialogVisible: false,
      evalRecords: [],
      form: {
        id: 1,
        evalStatus: '已通过',
        score: 100,
        remark: '评审备注'
      },
      rules: {
        score: [
          { required: true, message: '请输入评分', trigger: 'blur' },
          { validator: this.validateScore, trigger: 'blur' },
        ],
      },
      student: {
        cardId: '',
        name: '',
        grade: '',
        major: '',
        class: '',
      },
      summary: {},
      summaryCol: [ '思想政治总结', '行为规范总结', '学习态度总结', '身心健康总结' ],
      queryParams: {
        'judgeId': 2,
        'acYear': '2022-2023'
      }
    };
  },
  created() {
    // 获取评审记录列表
    this.getSummaryRecord(this.queryParams)
  },
  methods: {
    getSummaryRecord(params) {
      getSummaryRecordApi(params).then(res => {
        this.evalRecords = res.data.data
        this.evalRecords.forEach(row => {
          row.student.class = row.student.class1
        })
        this.$message({ type: 'success', message: res.data.message })
      })
    },
    getSummary(stuId) {
      summaryApis.getSummaryApi(stuId).then(res => {
        this.summary = res.data.data
        this.$message({ type: 'success', message: res.data.message })
      })
    },
    putSummaryRecord(data) {
      putSummaryRecordApi(data).then(res => {
        this.$message({ type: 'success', message: res.data.message })
      })
    },
    edit(row) {
      this.getSummary(row.stuId)
      this.form = {...row}
      this.form.score = this.form.evalStatus == '待审核' ? '' : row.score
      this.student = row.student
      this.dialogVisible = true
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form)
          // 调用 PUT 接口
          this.putSummaryRecord(this.form)
          this.closeForm(form)
          this.getSummary()
        }
      })
    },
    closeForm(form) {
      this.dialogVisible = false
      this.$refs[form].resetFields()
    },
    validateScore(rule, value, callback) {
      const score = Number(value); // 将输入值解析为数字
      if (isNaN(score)) {
        callback(new Error('评分必须为数字值'));
      } else if (score < 0 || score > 100) {
        callback(new Error('评分范围为0~100'));
      } else {
        callback();
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.sum-eval {
  padding: 10px;
  .form {
    height: 400px;
    text-align: left;
    overflow: auto;

    h1:first-child {
      margin-top: 0;
    }

    .summary-item {
      margin: 40px 0;
      .content {
        font-size: 16px;
      }
    }
  }
}
</style>