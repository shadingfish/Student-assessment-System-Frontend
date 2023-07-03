<template>
  <div class="report-form">
    <div class="summary">
      <h3 for="politic-summary">思想政治总结</h3>
      <textarea id="politic-summary" v-model="report.politicSum"></textarea>
    </div>
    <div class="summary">
      <h3 for="behave-summary">行为规范总结</h3>
      <textarea id="behave-summary" v-model="report.behaveSum"></textarea>
    </div>
    <div class="summary">
      <h3 for="study-summary">学习态度总结</h3>
      <textarea id="study-summary" v-model="report.studySum"></textarea>
    </div>
    <div class="summary">
      <h3 for="health-summary">身心健康总结</h3>
      <textarea id="health-summary" v-model="report.healthSum"></textarea>
    </div>
    <el-button type="primary" @click="submitForm(report)">提交</el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui' 
import { summaryApis } from '../api';
export default {
  data() {
    return {
      report: {
        politicSum: '',
        behaveSum: '',
        studySum: '',
        healthSum: ''
      }
    };
  },
  created() {
    this.getSummary()
  },
  methods: {
    submitForm(data) {
      summaryApis.summitSummaryApi(data).then(res => {
        Message({ message: res.data.message, type: 'success' })
      })
    },
    getSummary() {
      summaryApis.getSummaryApi().then(res => {
        this.report = res.data.data
        Message({ message: res.data.message, type: 'success' })
      })
    }
  }
};
</script>

<style>
.report-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}

.summary {
  margin-bottom: 16px;
}

.summary h3 {
  text-align: left;
  display: block;
  margin-bottom: 8px;
}

.summary textarea {
  width: 100%;
  height: 120px;
  resize: vertical;
}

.el-button {
  align-self: flex-center;
  margin-top: 16px;
}
</style>
