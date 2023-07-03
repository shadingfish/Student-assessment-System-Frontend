<template>
  <div>
    <el-table :data="volunteerActivityList" width="100%">
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="activityTime" label="活动时间"></el-table-column>
      <el-table-column prop="depart" label="部门等级"></el-table-column>
      <el-table-column prop="duration" label="志愿时长（小时）"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="download(scope.row)">查看材料</el-button>
          <el-button size="small" type="danger" @click="deleteVolunteerActivity(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h1>志愿服务申报</h1>
    <el-upload ref="upload" class="fileUpload" action="http://43.142.90.238:20235/api/upload" :on-success="handleSuccess"
      :auto-upload="false">
      <el-button type="primary">选择文件</el-button>
      <el-button type="primary" @click="uploadFile" style="margin-bottom: 20px;">上传文件</el-button>
    </el-upload>

    <el-form ref="form" :model="form" label-width="80px" align="left">
      <el-form-item label="活动名称">
        <el-input v-model="form.activityName"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.activityTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="部门等级">
        <el-select v-model="form.depart" placeholder="请选择级别">
          <el-option label="校级" value="校级"></el-option>
          <el-option label="院级" value="院级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="志愿时长">
        <el-input v-model="form.duration"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即申报</el-button>
        <el-button @click="reset()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { volunteerApis } from '../api';
export default {
  data() {
    return {
      volunteerActivityList: [],
      form: {
        activityName: '',
        activityTime: '',
        depart: '',
        duration: '',
        fileUrl: ''
      },
      targetId: '',
      file: null,
      records: [], // 上传的数据
      requests: [], // 学生订正志愿时长的请求
    };
  },
  created() {
    this.getVolunteerActivityList()
  },
  methods: {
    getVolunteerActivityList() {
      volunteerApis.getVolunteerActivityList().then(res => {
        this.volunteerActivityList = res.data.data
      })
    },
    // 上传文件
    uploadFile() {
      // 手动触发上传文件
      this.$refs.upload.submit();
    },
    handleSuccess(response) {
      // 处理上传成功的回调函数
      console.log('上传成功', response);
      this.form.fileUrl = response
    },
    // 提交表单
    onSubmit() {
      volunteerApis.addVolunteerActivityApi(this.form).then(res => {
        if (res.data.code == 200) {
          this.reset()
          this.$message({ message: res.data.message, type: "success" })
        }
      })
    },
    reset() {
      this.form = {
        activityName: '',
        activityTime: '',
        depart: '',
        duration: ''
      }
      this.file = null
    },
    deleteVolunteerActivity(row) {
      volunteerApis.deleteVolunteerActivity(row.id).then(res => {
        if (res.data.code == 200) {
          this.$message({ message: res.data.message, type: 'success' })
          this.getVolunteerActivityList()
        }
      })
    },
    download(row) {
      volunteerApis.download(row.fileUrl).then(res => {
        if (res.data.code == 200) {
          this.$message({ message: res.data.message, type: 'success' })
          // 创建一个 <a> 标签
          const link = document.createElement('a');
          link.href = res.data.data;
          link.target = '_blank';
          link.download = row.fileUrl; // 指定下载时的文件名，可根据实际情况修改
          // 触发点击事件，执行下载
          link.click();
        }
      })
    }
  },
};
</script>

<style lang="scss">
.fileUpload {
  display: flex;
  justify-content: left;
}
</style>