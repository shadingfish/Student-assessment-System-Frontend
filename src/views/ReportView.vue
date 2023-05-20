<!-- 学生在线填报页面 -->
<template>
  <div class="report-container">
    <div class="report-container" style="width:70vw; background-color: rgba(178,180,178,0.16)">
      <h2>用户信息</h2>
      <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px" class="demo-userForm">
        <el-form-item label="UID" prop="UID">
          <el-input v-model="userForm.UID"></el-input>
        </el-form-item>
        <el-form-item label="学年" prop="ac_year">
          <el-select v-model="userForm.ac_year" placeholder="请选择申请学年">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2023-2024" value="2023-2024"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

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


    <div class="report-container" style="width:70vw; background-color: rgba(178,180,178,0.16)">
      <h2>科研成果</h2>
      <br>
      <span style="color: crimson">注：</span>
      <span>每个成果项目最多上传一个word/pdf文件，且不超过500kb。</span>
      <span>在审状态的成果产出日期选择当前日期。</span>
      <span>对于来源出处填框，对于论文填写发表所在的期刊；对于专利填写专利类型（如实用新型专利）。</span>
      <br>
      <el-form :model="researchForm" ref="researchForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            v-for="(domain, index) in researchForm.domains"
            :label="'成果' + index"
            :key="domain.key">
          <div class="input-suffix">
            <span>成果名称：</span>
            <el-input v-model="domain.output_name"></el-input>
          </div>
          <div class="input-suffix">
            <span>类型与产出时间：</span>
            <el-select v-model="domain.output_type" placeholder="请选择类型">
              <el-option label="论文" value=1></el-option>
              <el-option label="专利" value=2></el-option>
            </el-select>
            <el-date-picker
                style="min-width: 25%"
                type="date"
                placeholder="产出时间"
                v-model="domain.output_time"
                prefix-icon="el-icon-date">
            </el-date-picker>
          </div>
          <div class="input-suffix">
            <span>来源出处：</span>
            <el-input
                placeholder="请填写出处"
                v-model="domain.category">
            </el-input>
          </div>
          <div class="input-suffix">
            <span>级别与贡献度：</span>
            <el-select v-model="domain.ranking" placeholder="请选择级别">
              <el-option label="专利" value=1></el-option>
              <el-option label="中科院一区" value=2></el-option>
              <el-option label="中科院二区" value=3></el-option>
              <el-option label="中科院三区" value=4></el-option>
              <el-option label="中科院四区" value=5></el-option>
            </el-select>
            <el-select v-model="domain.level" placeholder="请选择贡献度">
              <el-option label="第一作者" value=1></el-option>
              <el-option label="第二作者" value=2></el-option>
              <el-option label="第三作者" value=3></el-option>
              <el-option label="第四作者" value=4></el-option>
            </el-select>
          </div>
          <div class="input-suffix">
            <!--:on-success="handleUploadSuccess"-->
            <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-success="response => handleUploadSuccess(response, index)"
                :on-remove="file  => handleRemove(file, index)"
                :before-remove="beforeRemove"
                :on-error="handleUploadError"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="domain.fileList">
              <el-button size="mini" type="primary">点击上传证明材料
                <i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
          </div>
          <el-button style="align-self: flex-start" size="mini" @click.prevent="removeDomain(domain)">删除该项目</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('researchForm')">提交</el-button>
          <el-button size="mini" @click="addDomain">新增项目</el-button>
          <el-button size="mini" @click="saveForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

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
import {researchSubmit} from "@/api/researchSubmit";

export default {
  data() {
    return {
      studentData: [],
      //*************************************科研相关数据 开始*************************************
      userForm: {
        UID: '',
        ac_year: '',
      },
      userRules: {
        UID: [
          { required: true, message: '请输入用户UID', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ac_year: [
          { required: true, message: '请选择申请学年', trigger: 'change' }
        ],
      },
      researchForm: {
        UID: '',
        ac_year: '',
        domains: [{
          key: Date.now(),
          output_name: '',
          output_type: '',
          category: '',
          ranking: '',
          level: '',
          output_time: '',
          fileList: []
        }],
      },
      uploadUrl: 'http://localhost:20235/file/upload',
      //*************************************科研相关数据 结束*************************************
    }
  },
  methods: {
    //*************************************科研相关方法 开始*************************************
    submitForm(formName) {
      this.researchForm.UID = this.userForm.UID;
      this.researchForm.ac_year = this.userForm.ac_year;
      console.log("表结构: ", this.researchForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          researchSubmit(this.researchForm).then(res =>{
            if(res.data.code === 500){
              this.$message.error('提交失败，可能已经提交过该文件')
              console.error('提交失败，可能已经提交过该文件')
              return false;
            }
            console.log("Response: ", res);
            alert('成功提交!');
          }).catch(() => {
            this.$message.error('提交失败')
            console.error('提交失败。')
          })
        } else {
          console.log('提交出错!!');
          return false;
        }
      });
    },
    saveForm() {
      this.researchForm.UID = this.userForm.UID;
      this.researchForm.ac_year = this.userForm.ac_year;
      console.log("表结构: ", this.researchForm);
      alert('保存成功!');
    },
    removeDomain(item) {
      let index = this.researchForm.domains.indexOf(item)
      if (index !== -1) {
        this.researchForm.domains.splice(index, 1)
      }
      console.log(this.researchForm.domains);
    },
    addDomain() {
      this.researchForm.domains.push({
        key: Date.now(),
        output_name: '',
        output_type: '',
        category: '',
        ranking: '',
        level: '',
        output_time: '',
        fileList: []
      });
      console.log(this.researchForm.domains);
    },
    handleUploadSuccess(response, domainIndex) {
      console.log(response);
      // 处理上传成功后的回调
      // 在这里你可以从后端接口返回的数据中提取文件名和文件地址，并将其添加到fileList数组中
      let name = response.data[0];
      let url = response.data[1];
      let domain = this.researchForm.domains[domainIndex];
      domain.fileList.push({ name, url });
      console.log(domain.fileList);
    },
    handleUploadError(error, file, fileList) {
      // Handle the file upload error here
      console.error('文件上传失败:', error);
      console.log('File:', file);
      console.log('File List:', fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // eslint-disable-next-line no-unused-vars
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, domainIndex) {
      console.log(file);
      let domain = this.researchForm.domains[domainIndex];
      domain.fileList.pop();
      console.log(domain.fileList);
    },
    //*************************************科研相关方法 结束*************************************
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
</style>
