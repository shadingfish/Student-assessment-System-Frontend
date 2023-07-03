

<template>
  <div class="science_admin">
    <h1>实践情况审核</h1>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button @click="clearFilter">清除所有过滤器</el-button>
      </el-header>

      <el-main style="text-align: center">
        <el-table ref="filterTable"
                  :data="tableData"
                  style="width: 100%; text-align: center">
          <el-table-column align="center" prop="name" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="card_id" label="学号">
          </el-table-column>
          <el-table-column align="center" prop="grade" label="年级">
          </el-table-column>
          <el-table-column align="center" prop="school" label="学院">
          </el-table-column>
          <el-table-column align="center" prop="major" label="专业">
          </el-table-column>
          <el-table-column align="center" prop="ac_year" label="申请学年">
          </el-table-column>
          <el-table-column align="center" prop="score" label="得分">
          </el-table-column>
          <el-table-column align="center" prop="eval_status" label="状态">
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewPersonal(scope.$index)">查看</el-button>
              <el-button type="text" size="small" @click="returnVisible = true">打回</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog width="1200px" :title=current_title :visible.sync="dialogTableVisible">
          <span>{{current_submit}}</span>
          <el-table :data="gridData" max-height="400px">
            <el-table-column align="center" property="pracType" label="名称" width="200px"></el-table-column>
            <el-table-column align="center" property="startDate" label="开始时间" width="100px"></el-table-column>
            <el-table-column align="center" property="endDate" label="结束时间" width="100px"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="downloadResearch(scope.$index)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="scoreVisible = true">打分</el-button>
            <el-button @click="dialogTableVisible = false">返回</el-button>
          </div>
        </el-dialog>

        <el-dialog
            title="打回提示"
            :visible.sync="returnVisible"
            width="30%">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
          </el-input>
          <span slot="footer" class="dialog-footer">
                  <el-button size="mini" @click="returnVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="returnVisible = false">发送</el-button>
                   </span>
        </el-dialog>

        <el-dialog
            title="输入0~100之间整数分数"
            :visible.sync="scoreVisible"
            width="30%">
          <el-input
              placeholder="请输入分数"
              v-model="given_score"
              @input="sanitizeInput">
          </el-input>
          <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="withdrawGive">取消</el-button>
                        <el-button type="primary" size="mini" @click="giveScore(current_index)">确认</el-button>
                      </span>
        </el-dialog>


      </el-main>

    </el-container>
  </div>
</template>

<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
import {checkPractice, getPraEvalList, pracScoreSubmit} from "@/yudingyi/api/practice";
import axios from "axios";
import {BASE_URL} from "@/utils/request";

Vue.use(Plugin);
export default {
  data() {
    return {
      given_score: 0,
      current_title:'',
      current_submit:'',
      current_index: 0,
      textarea: '',
      dialogTableVisible: false,
      returnVisible: false,
      scoreVisible:false,
      tableData: [{
        // name: '', //姓名
        // card_id: '', //学号
        // grade: 0, //年级
        // school: '', //学院
        // major: '', //专业
        // scholarship: '', //申请类型
        // ac_year:'', // 申请学年
        // researchScore: '', //得分
      },],
      gridData:[
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
      ],
    }
  },
  mounted() {
    console.log('通过接口获取科研审核学生信息数据，json格式');
    checkPractice().then(response => {
              console.log('科研审核学生信息 获取成功', response);
              this.tableData = response;
              console.log(this.tableData);
            }
        )
        .catch(error => console.log('学生信息请求失败', error));
  },
  methods: {
    handleSizeChange(val){
      this.pageSize=val;
    },
    handleCurrentChange(val){
      this.currentPage=val;
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    // eslint-disable-next-line no-unused-vars
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    formatTimestamp(timestamp) {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    },
    viewPersonal(index){
      let clickedItem = this.tableData[index];
      this.current_index = index;
      let root = this;
      console.log(clickedItem);
      let stuId = clickedItem.id;
      this.current_title = clickedItem.name + '科研情况';
      getPraEvalList(stuId).then(response => {
                console.log('学生实践细节 获取成功', response);
                let grids = response;
                grids.forEach(function(grid){
                  grid.startDate = root.formatTimestamp(grid.startDate);
                  grid.endDate = root.formatTimestamp(grid.endDate);
                  grid.submitTime = root.formatTimestamp(grid.submitTime);
                });
                this.current_submit = '最近更新时间: ' + grids[0].submitTime;
                this.gridData = grids;
                console.log(this.gridData);
                this.dialogTableVisible = true;
              }
          )
          .catch(error => {
            console.log('科研细节请求失败', error);
            alert('学生还未提交材料。');
          });
    },
    downloadResearch(index) {
      let clickedItem = this.gridData[index];
      axios({
        url: BASE_URL + `/api/downloadFiles/${encodeURIComponent(clickedItem.fileUrl)}`,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', clickedItem.fileUrl); // 这里的 'this.form.fileUrl' 是数据库中存储的url,可根据实际情况修改
        document.body.appendChild(link);
        link.click();
        // handle your response here
      }).catch(error => {
            console.error('Download failed:', error);
            this.$message.error('未上传证明文件')
            // handle your error here
          });
    },
    withdrawGive(){
      this.given_score = 0;
      this.scoreVisible = false;
    },
    giveScore(index){
      let root = this;
      let clickedItem = this.tableData[index];
      console.log(clickedItem);
      let stuId = clickedItem.id;
      let score = this.given_score;
      let judge = [stuId, score];
      pracScoreSubmit(judge).then(res =>{
        console.log("Response: ", res);
        alert('打分成功!将刷新页面。');
        setTimeout(() => {
          location.reload(); // Refresh the page
        }, 2000); // Set the timeout to 3 seconds (3000 milliseconds)
      }).catch(() => {
        // 修改失败，显示错误提示
        this.$message.error('打分失败');
        root.scoreVisible = false;
      })
    },
    sanitizeInput(){
      // Remove non-numeric characters from the input value
      this.given_score = this.given_score.replace(/\D/g, '');
    }
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-button {
  margin: 0.5em;
}

.el-table th,
.el-table td {
  white-space: nowrap;
  div.cell{
    text-align: center;
  }
  .is-center{
    text-align: center;
  }
}

.el-table .el-table__header th div {
  text-align: center;
}

.el-table .el-table__body td div {
  text-align: center;
}

.el-table-column{
  width:auto
}

h1 {
  font-size: xx-large;
  font-weight: bolder;
  margin: 0.5em;
}
</style>
