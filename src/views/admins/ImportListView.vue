<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">导入学生</el-button>

    <el-dialog title="导入学生" :visible.sync="dialogVisible" width="40%">
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
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFile">上 传</el-button>
      </div>
    </el-dialog>

    <el-table v-if="pagedStudentList.length > 0" :data="pagedStudentList" border>
      <el-table-column prop="card_id" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="school" label="学院"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="stu_class" label="班级"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
    </el-table>

    <el-pagination
      v-if="studentList.length > 0"
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalStudents"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getPage } from "@/api/upload";

export default {
  data() {
    return {
      dialogVisible: false,
      uploadUrl: "http://localhost:20235/student/import",
      file: null,
      currentPage: 1,
      pageSize: 10,
      studentList: [], // 学生列表数据
      totalStudents: 0, // 总学生数
    };
  },
  mounted() {
    this.fetchStudentList();
  },
  methods: {
    async fetchStudentList() {
      const response = await getPage(this.currentPage, this.pageSize);
      this.studentList = response.data.data.rows; // 将数据赋值给studentList
      this.totalStudents = response.data.data.total; // 设置总学生数
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
      this.fetchStudentList();
    },
  },
  computed: {
    pagedStudentList() {
      return this.studentList; // 不需要分页处理，直接返回当前页的列表数据
    },
  },
};
</script>
