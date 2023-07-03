<template>
  <div>

    <h1>志愿服务申报</h1>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadData">上传</button>
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
import { Message } from 'element-ui';
import { volunteerApis } from '../api'; 
export default {
  data() {
    return {
      volunteerActivityList: [],
      form: {
        activityName: '',
        activityTime: '',
        depart: '',
        duration: ''
      },
      targetId: '',
      file: null,
      records: [], // 上传的数据
      requests: [], // 学生订正志愿时长的请求
    };
  },
  methods: {
    onSubmit() {
      volunteerApis.addVolunteerActivityApi(this.form).then(res => {
        if (res.data.code == 200) {
          this.reset()
          Message({message: res.data.message, type: "success"})
          this.targetId = res.data.data
        }
      })
      // volunteerApis.addVolunteerFileApi(this.targetId, this.file).then()
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    reset() {
      this.form = {
        activityName: '',
        activityTime: '',
        depart: '',
        duration: ''
      }
    },

    async uploadData() {
      const data = new FormData();
      data.append('file', this.file);

      const response = await fetch('/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        this.records = result.records;
        this.requests = result.requests;
      }
    },
    async handleRequest(request) {
      const response = await fetch(`/correct-hours/${request.id}`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        request.status = '已处理';
      }
    },
  },
};
</script>