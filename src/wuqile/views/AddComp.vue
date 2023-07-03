<template>
    <div>
      <h2>竞赛获奖情况</h2>
      <el-button type="primary" @click="dialogVisibleAdd = true">添加记录</el-button>
      <el-table :data="tableData">
        <el-table-column prop="compName" label="竞赛名称"></el-table-column>
        <el-table-column prop="awardTime" label="时间"></el-table-column>
        <el-table-column prop="level" label="竞赛级别"></el-table-column>
        <el-table-column prop="ranking" label="竞赛名次"></el-table-column>
        <el-table-column prop="award" label="获奖情况"></el-table-column>
        <el-table-column prop="evalStatus" label="评审状况"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog title="编辑记录" :visible.sync="dialogVisibleEdit">
        <el-form :model="form">
          <el-form-item label="竞赛名称">
            <el-input v-model="form.compName"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="form.awardTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="学年" prop="acYear">
          <el-select v-model="form.acYear" placeholder="请选择申请学年">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2023-2024" value="2023-2024"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="竞赛级别">
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in ['国际级','国家级','省级','市级','校级']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="竞赛排名">
            <el-select v-model="form.ranking" placeholder="请选择">
              <el-option
                v-for="item in ['1','2','3','4','5']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获奖情况">
            <el-input v-model="form.award"></el-input>
          </el-form-item>
          <el-form-item label="证明材料">
            <el-upload
              action="http://localhost:20235/api/upload"
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
          <el-form-item label="竞赛名称">
            <el-input v-model="Addform.compName"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker v-model="Addform.awardTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="学年" prop="acYear">
          <el-select v-model="Addform.acYear" placeholder="请选择申请学年">
            <el-option label="2022-2023" value="2022-2023"></el-option>
            <el-option label="2023-2024" value="2023-2024"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="竞赛级别">
            <el-select v-model="Addform.level" placeholder="请选择">
              <el-option
                v-for="item in ['国际级','国家级','省级','市级','校级']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="竞赛排名">
            <el-select v-model="Addform.ranking" placeholder="请选择">
              <el-option
                v-for="item in ['1','2','3','4','5']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获奖情况">
            <el-input v-model="Addform.award"></el-input>
          </el-form-item>
          <el-form-item label="证明材料">
            <el-upload
              action="http://localhost:20235/api/upload"
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
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { insertComp } from '../api/Comp';
  import { getComp } from '../api/Comp';
  import { updateComp } from '../api/Comp';
  import { deleteComp } from '../api/Comp';
  import { getFile } from '../api/download';
   export default {
    data() {
      return {
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
        currentRowIndex: null,
        tableData: [],
        form: {
          compName: '',
          awardTime: '',
          level: '',
          award: '',
          acYear:'',
          ranking: '',
          url: ''
        },
        Addform: {
          compName: '',
          awardTime: '',
          level: '',
          award: '',
          url: '',
          ranking: '',
          acYear:'',
          stuId:'',
          cardId:'',
          submitTime:'',
          evalTime:'',
          matType:''
        },
        fileList: []
      };
    },
    mounted(){
      getComp().then((_)=>{
        console.log(_.data.data)
        this.tableData=_.data.data
      })
    },
    methods: {
      onPreview(){
        getFile(this.form.fileUrl).then((response)=> {
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', url); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
      },
      handleUploadSuccess(response) {
        // TODO: replace with your actual code
        this.form.fileUrl = response;
        updateComp(this.form)
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
        deleteComp(row.matId).then((res)=>{
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
        updateComp(this.form).then((_)=>{
          this.$message.success(_.data.message)
          location.reload()
        })
      },
      submitForm() {
        insertComp(this.Addform).then((res)=>{
          this.$message.success(res.data.message)
          location.reload()
        })
        // TODO: perform validation and send a request to the server
      }
    }
  };
  </script>
  