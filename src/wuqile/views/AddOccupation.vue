<template>
    <div>
      <h2>学生骨干服务岗位任职</h2>
      <el-button type="primary" @click="dialogVisibleAdd = true">添加记录</el-button>
      <el-table :data="tableData">
        <el-table-column prop="acYear" label="学年"></el-table-column>
        <el-table-column prop="depart" label="部门"></el-table-column>
        <el-table-column prop="level" label="级别"></el-table-column>
        <el-table-column prop="occupation" label="职位"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog title="编辑记录" :visible.sync="dialogVisibleEdit">
        <el-form :model="form">
          <el-form-item label="组织名称">
            <el-input v-model="form.depart"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.occupation"></el-input>
          </el-form-item>
          <el-form-item label="起止时间">
            <el-row>
              <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期"></el-date-picker>
              <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-row>            
          </el-form-item>
          <el-form-item label="学年" prop="acYear">
          <el-select v-model="form.acYear" placeholder="请选择申请学年">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2023-2024" value="2023-2024"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="组织级别">
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in ['班级/苑级','年级','院级','校级']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证明材料">
            <el-upload
              action="http://43.142.90.238:20235/api/upload"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleUploadSuccess"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">取消</el-button>
          <el-button type="primary" @click="onPreview">下载证明材料</el-button>
          <el-button type="primary" @click="updateForm">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="添加记录" :visible.sync="dialogVisibleAdd">
        <el-form :model="Addform">
          <el-form-item label="组织名称">
            <el-input v-model="Addform.depart"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="Addform.occupation"></el-input>
          </el-form-item>
          <el-form-item label="起止时间">
            <el-row>
              <el-date-picker v-model="Addform.startDate" type="date" placeholder="选择开始日期"></el-date-picker>
              <el-date-picker v-model="Addform.endDate" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-row>            
          </el-form-item>
          <el-form-item label="学年" prop="acYear">
          <el-select v-model="Addform.acYear" placeholder="请选择申请学年">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2023-2024" value="2023-2024"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="组织级别">
            <el-select v-model="Addform.level" placeholder="请选择">
              <el-option
                v-for="item in ['班级/苑级','年级','院级','校级']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证明材料">
            <el-upload
              action="http://43.142.90.238:20235/api/upload"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleUploadSuccess"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取消</el-button>
          <el-button type="primary" @click="onPreview">下载证明材料</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getOccu } from '../api/Occupation';
  import { insertOccu } from '../api/Occupation';
  import { updateOccu } from '../api/Occupation';
  import { deleteOccu } from '../api/Occupation';
  import axios from 'axios';
  export default {
    data() {
      return {
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
        currentRowIndex: null,
        tableData: [],
        form: {
          matId:'',
          stuId:'',
          cardId:'',
          judgeId:'',
          acYear:'',
          matType:'',
          evalStatus:'',
          remark:'' ,
          fileUrl:'' ,
          submitTime:'',
          evalTime:'',
          depart:'',
          level:'',
          occupation:'',
          startDate:'',
          endDate:''
        },
        Addform: {
          matId:'',
          stuId:'',
          cardId:'',
          judgeId:'',
          acYear:'',
          matType:'',
          evalStatus:'',
          remark:'' ,
          fileUrl:'' ,
          submitTime:'',
          evalTime:'',
          depart:'',
          level:'',
          occupation:'',
          startDate:'',
          endDate:''
        },
        fileList: []
      };
    },
    mounted(){
      getOccu().then((_)=>{
        console.log(_.data.data)
        this.tableData=_.data.data
      })
    },
    methods: {
      onPreview(){
        /* axios.get(`http://43.142.90.238:20235/api/downloadFiles/${encodeURIComponent(this.form.fileUrl)}`) */
        axios({
          url: `http://43.142.90.238:20235/api/downloadFiles/${encodeURIComponent(this.form.fileUrl)}`,
          method: 'GET',
          responseType: 'blob', // important
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.form.fileUrl); // 这里的 'file.txt' 是下载后的文件名，你可以根据实际情况修改
          document.body.appendChild(link);
          link.click();
          // handle your response here
        })
        .catch(error => {
          console.error('Download failed:', error);
          this.$message.error('未上传证明文件')
          // handle your error here
        });

      },
      handleUploadSuccess(response) {
        // TODO: replace with your actual code
        this.form.fileUrl = response;
        updateOccu(this.form)
        console.log(this.form)
      },
        beforeUpload(file) {
            const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJPGPNG) {
            this.$message.error('上传的图片只能是 JPG 或 PNG 格式!');
            }
            return isJPGPNG;
        },
      handleEdit(index, row) {
        console.log(index)
        this.form = Object.assign({}, row); // copy data from the row to the form
        this.currentRowIndex=row;
        this.dialogVisibleEdit = true;
      },
      handleDelete(index, row) {
        console.log(row.matId)
        deleteOccu(row.matId).then((res)=>{
          this.$message.info(res.data.message)
          location.reload()
        })
        //this.tableData.splice(index, 1); // remove the row from the table data
      },
      handlePreview(file) {
        window.open(file.url); // Open the file in a new tab
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.form.url=''
      },
      beforeRemove(file, fileList) {
        console.log(fileList)
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      updateForm(){
        updateOccu(this.form).then((_)=>{
          this.$message.success(_.data.message)
          location.reload()
        })
      },
      submitForm() {
        insertOccu(this.Addform).then((res)=>{
          this.$message.success(res.data.message)
          //location.reload()
        })
        // TODO: perform validation and send a request to the server
      }
    }
  };
  </script>
  