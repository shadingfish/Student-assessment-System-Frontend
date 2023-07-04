<template>
    <div>
      <el-container>
        <el-header
          ><el-button type="primary" @click="dialogVisible = true"
            >导入学生成绩</el-button
          >
  
          <el-dialog
            title="导入学生成绩"
            :visible.sync="dialogVisible"
            width="40%"
          >
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :action="uploadUrl"
              :limit="1"
              accept=".xlsx, .xls"
              :auto-upload="false"
              :on-change="handleFileChange"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip text-center" slot="tip">
                <span>仅允许导入xls、xlsx格式文件。</span>
              </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="uploadFile">上 传</el-button>
            </div>
          </el-dialog></el-header
        >
        <el-main
          ><el-table v-if="gpaList.length > 0" :data="gpaList" border
            ><el-table-column
              type="index"
              :index="indexMethod"
              align="center"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="cardId" label="学号"></el-table-column>
            <el-table-column prop="name" label="学年"></el-table-column>
            <el-table-column prop="depart" label="GPA"></el-table-column>
            <el-table-column prop="job" label="排名"></el-table-column>
            <el-table-column prop="role" label="总人数"></el-table-column>
            <el-table-column prop="password" label="确认状态"></el-table-column>
            <el-table-column prop="status" label="确认时间"></el-table-column>
       </el-table
        ></el-main>
        <el-footer
          ><el-pagination
            v-if="gpaList.length > 0"
            background
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalGpa"
            :page-sizes="[10, 20, 30, 50]"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
          >
          </el-pagination
        ></el-footer>
      </el-container>
    </div>
  </template>
    
    <script>
  import { getGpaPage } from "@/wanglingyu/api/import";
  
  export default {
    data() {
      return {
        dialogVisible: false,
        uploadUrl: "http://localhost:20235/gpa/import",
        file: null,
        currentPage: 1,
        pageSize: 10,
        gpaList: [], // 学生列表数据
        totalGpa: 0, // 总学生数
      };
    },
    mounted() {
      this.fetchGpaList();
    },
    methods: {
      indexMethod(index) {
        return index + 1 + (this.currentPage - 1) * this.pageSize; // 返回表格序号
      },
      async fetchGpaList() {
        const response = await getGpaPage(this.currentPage, this.pageSize);
        this.gpaList = response.data.data.rows; // 将数据赋值给gpaList
        this.totalGpa = response.data.data.total; // 设置总学生数
      },
      handleFileChange(file) {
        this.file = file;
      },
      uploadFile() {
        if (this.file) {
          this.$refs.upload.submit();
          this.dialogVisible = false;
        } else {
          // 处理未选择文件的情况
          // 可以显示提示信息或进行其他操作
        }
      },
      handlePageChange(currentPage) {
        this.currentPage = currentPage;
        this.fetchGpaList();
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.fetchGpaList();
      },
    },
  };
  </script>