<!-- 个人学年总结评审页面 -->
<template>
  <div class="volunteer-eval">
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
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)">
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
                <el-tag :type="form.evalStatus == '已审核' ? 'success' : 'warning'" size="medium">{{ form.evalStatus
                }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <h1>志愿活动记录</h1>
        <el-table :data="volunteerActivityList" width="100%">
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="activityTime" label="活动时间"></el-table-column>
          <el-table-column prop="depart" label="部门等级"></el-table-column>
          <el-table-column prop="duration" label="志愿时长（小时）"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="downloadVolunteerActivity(scope.row)">查看材料</el-button>
            </template>
          </el-table-column>
        </el-table>

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
import axios from 'axios';
import { volunteerApis } from '@/wangdy55/api';
export default {
  data() {
    return {
      dialogVisible: false,
      evalRecords: [],
      volunteerActivityList: [],
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
      }
    };
  },
  created() {
    // 获取评审记录列表
    this.getVolunteerRecordList()
  },
  methods: {
    getVolunteerRecordList() {
      volunteerApis.getVolunteerRecordList().then(res => {
        if (res.data.code == 200) {
          this.evalRecords = res.data.data
          this.$message({ message: res.data.message, type: 'success' })
        }
      })
    },
    getVolunteerActivityList(cardId) {
      volunteerApis.getVolunteerActivities(cardId).then(res => {
        if (res.data.code == 200) {
          this.volunteerActivityList = res.data.data
          this.$message({ message: res.data.message, type: 'success' })
        }
      })
    },
    updateVolunteerRecord(data) {
      volunteerApis.updateVolunteerRecord(data).then(res => {
        if (res.data.code == 200) {
          this.$message({ message: res.data.message, type: 'success' })
        }
      })
    },
    edit(row) {
      this.getVolunteerActivityList(row.student.cardId)
      this.form = { ...row }
      this.form.score = this.form.evalStatus == '待审核' ? '' : row.score
      this.student = row.student
      this.dialogVisible = true
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 调用 PUT 接口
          this.updateVolunteerRecord(this.form)
          this.closeForm(form)
          volunteerApis.getVolunteerRecordList()
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
    downloadVolunteerActivity(row) {
      axios({
        url: 'http://43.142.90.238:20235' + `/api/downloadFiles/${encodeURIComponent(row.fileUrl)}`,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', row.fileUrl); // 这里的 'this.form.fileUrl' 是数据库中存储的url,可根据实际情况修改
        document.body.appendChild(link);
        link.click();
        // handle your response here
      }).catch(error => {
        console.error('Download failed:', error);
        this.$message.error('未上传证明文件')
        // handle your error here
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.volunteer-eval {
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