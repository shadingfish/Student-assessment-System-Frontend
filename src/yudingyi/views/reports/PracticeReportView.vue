<template>
  <div class="dashboard-container" id="research-list">
    <div class="container">
      <div class="tableBar">
        <div class="tableLab">
          <el-button
              type="primary"
              @click="addHandle('add')"
          >
            + 新增材料
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" class="tableBox">
        <el-table-column
            prop="id"
            label="ID"
        ></el-table-column>
        <el-table-column
            prop="pracType"
            label="实践名称"
        ></el-table-column>
        <el-table-column
            prop="startDate"
            label="开始日期"
        ></el-table-column>
        <el-table-column
            prop="endDate"
            label="停止日期"
        ></el-table-column>
        <el-table-column
            prop="submitTime"
            label="提交时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="160"
            align="center"
        >
          <template slot-scope="scope">
            <el-button
                type="text"
                size="small"
                class="blueBug"
                @click="addHandle(scope.$index)"
            >
              修改
            </el-button>
            <el-button
                type="text"
                size="small"
                class="delBut non"
                @click="deleteHandle(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog width="1200px" :visible.sync="dialogTableVisible">
      <h2>实践成果</h2>
      <br>
      <span style="color: crimson">注：</span>
      <span>每个成果项目最多上传一个word/pdf文件，且不超过500kb。</span>
      <span>在审状态的成果产出日期选择当前日期。</span>
      <span>对于来源出处填框，对于论文填写发表所在的期刊；对于专利填写专利类型（如实用新型专利）。</span>
      <br>
      <el-form ref="researchForm" :model="gridData" label-width="300px">

        <el-form-item label="实践名称">
          <el-input v-model="gridData.pracType"></el-input>
        </el-form-item>

        <el-form-item label="申请学年">
          <el-select v-model="gridData.acYear" placeholder="请选择类型">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2021-2022" value="2021-2022"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="gridData.startDate" style="width: 100%;">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="gridData.endDate" style="width: 100%;">
          </el-date-picker>
        </el-form-item>

        <div class="input-suffix">
          <!--:on-success="handleUploadSuccess"-->
          <el-upload
              class="upload-demo"
              :action=uploadUrl
              :headers="{
                'Authorization': getToken(),
              }"
              :on-success="response => handleUploadSuccess(response, index)"
              :on-remove="file  => handleRemove(file, index)"
              :before-remove="beforeRemove"
              :on-error="handleUploadError"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="this.fileList">
            <el-button size="mini" type="primary">点击上传证明材料
              <i class="el-icon-upload el-icon--right"></i></el-button>
          </el-upload>
        </div>

        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
          <el-button size="mini" @click="saveForm">保存</el-button>
          <el-button size="mini" @click="dialogTableVisible = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
import {getToken} from "@/utils/token";
import {deletePractice, getPracticeList, submitPractice} from "@/yudingyi/api/practice";

Vue.use(Plugin);
export default{
  mounted() {
    this.init();
  },
  data(){
    return {
      currentIndex: 0,
      textarea: '',
      dialogTableVisible: false,
      // uploadUrl: 'http://localhost:20235/file/upload',
      uploadUrl: 'http://localhost:20235/upload',
      tableData : [],
      // id
      // acYear: '',
      // output_name	varchar(32)
      // output_type	enum('学术论文', '专利')
      // category	varchar(100)
      // output_time	date
      // submit_time	datetime
      // "description":"个人个人围观认为",
      // "file_name": "dxxxx",
      // "file_url":"D:\\二学位非软件文件\\敏捷软件开发\\小组项目\\stu-eval-backend\\src\\main\\resources\\static/CV Wu Qile New.docx
      gridData:{
        id: 0,
        acYear: '',
        pracType: '',
        startDate: '',
        endDate: '',
        fileUrl: '',
      // (int id, String acYear, String fileUrl, String pracType, Date startDate, Date endDate)
      },
      fileList: [
        // name: '',
        // file_url: '',
      ],
    }
  },
  methods:{
    getToken,
    //初始化
    async init() {
      await getPracticeList().then(res => {
        if (res.code === 200) {
          console.log("获得的列表: ", res.data);
          this.tableData = res.data || []
          // 遍历 tableData 数组
          this.tableData.forEach((item) => {
            // 转换 startDate
            item.startDate = new Date(item.startDate);
            item.startDate = this.formatDate(item.startDate); // 假设 formatDate 是一个自定义函数，用于格式化日期

            // 转换 endDate
            item.endDate = new Date(item.endDate);
            item.endDate = this.formatDate(item.endDate); // 假设 formatDate 是一个自定义函数，用于格式化日期

            // 转换 submit_time
            item.submitTime = new Date(item.submitTime);
            item.submitTime = this.formatDate(item.submitTime); // 同样假设 formatDate 是一个自定义函数，用于格式化日期
          });
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    // 添加
    addHandle (st) {
      if (st === 'add'){
        this.gridData = {
          id: 0,
          acYear: '',
          pracType: '',
          startDate: '',
          endDate: '',
          fileUrl: ''
        }
        this.fileList = [];
        this.dialogTableVisible = true;
      } else {
        this.currentIndex = st;
        let clickedItem = this.tableData[st];
        console.log("获取已填写细节内容：", clickedItem);
        this.gridData.id = clickedItem.id;
        this.gridData.acYear = clickedItem.acYear;
        this.gridData.pracType = clickedItem.pracType;
        this.gridData.startDate = clickedItem.startDate;
        this.gridData.endDate = clickedItem.endDate;

        let name = "材料已上传";
        let url =clickedItem.fileUrl;
        this.gridData.fileUrl = url;
        this.fileList = [{ name, url }];

        console.log("细节内容：", this.gridData);
        console.log("文件列表：", this.fileList);

        this.dialogTableVisible = true;
      }
    },
    submitForm() {
      submitPractice(this.gridData).then(res =>{
        console.log("表结构: ", this.gridData);
        if(res.data.code === 500){
          this.$message.error('提交失败，可能已经提交过该文件')
          console.error('提交失败，可能已经提交过该文件')
          return false;
        }
        console.log("Response: ", res);
        this.$message.success('成功提交!');
        //刷新页面
        this.init();
      }).catch(() => {
        this.$message.error('提交失败');
        console.error('提交失败。');
      })
    },
    saveForm() {
      console.log("表结构: ", this.gridData);
      this.$message.success('保存成功!');
    },
    // 删除
    deleteHandle (id) {
      this.$confirm('确认删除该记录, 是否继续?', '确定删除', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
      }).then(() => {
        this.currentIndex = id;
        let clickedItem = this.tableData[id];
        console.log("获取已填写细节内容：", clickedItem);
        deletePractice(clickedItem.id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            //刷新页面
            this.init();
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })
      })
    },
    handleUploadSuccess(response) {
      console.log(response);
      // 处理上传成功后的回调
      // 在这里你可以从后端接口返回的数据中提取文件名和文件地址，并将其添加到fileList数组中
      let name = response.data;
      let url = response.data;
      this.gridData.fileName = name;
      this.gridData.fileUrl = url;
      this.fileList = [{ name, url }];
      // this.gridData.fileName = name;
      // this.gridData.fileUrl = url;
      console.log(this.fileList);
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
    handleRemove(file) {
      console.log(file)
      this.gridData.fileList.pop();
      console.log(this.gridData.fileList);
    },

  }
}

</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
}

.dashboard-container .container {
  background: #fff;
  position: relative;
  z-index: 1;
  padding: 30px 28px;
  border-radius: 4px;
}

.dashboard-container .container .tableBar {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}

.dashboard-container .container .tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}

.dashboard-container .container .tableLab .span-btn {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  padding: 0 20px;
  color: #818693;
  border-right: solid 1px #d8dde3;
}

.dashboard-container .container .tableLab .el-button {
  margin-left: 10px;
}

.el-button--text {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.el-table td {
  font-size: 13px !important;
}

.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 12px;
}

.blueBug {
  color: #419eff !important;
  position: relative;
}
.blueBug::after {
  content: "";
  position: absolute;
  right: -6px;
  height: 14px;
  width: 0px;
  border-right: solid 1px #ebeef5 !important;
}
.delBut {
  color: #f56c6c !important;
  position: relative;
}
.delBut::after {
  content: "";
  position: absolute;
  right: -6px;
  height: 14px;
  width: 0px;
  border-right: solid 1px #ebeef5 !important;
}
.non::after {
  display: none;
}
div:focus {
  outline: none;
}


</style>
