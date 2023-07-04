<template>
  <div>
    <el-container>
      <el-header
        ><el-button type="primary" @click="dialogVisible = true"
          >导入教职工名单</el-button
        >

        <el-dialog
          title="导入教职工名单"
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
        ><el-table v-if="facultyList.length > 0" :data="facultyList" border
          ><el-table-column
            type="index"
            :index="indexMethod"
            align="center"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="cardId" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="depart" label="部门"></el-table-column>
          <el-table-column prop="job" label="职位"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="birthday" label="生日"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
          ></el-table-column> </el-table
      ></el-main>
      <el-footer
        ><el-pagination
          v-if="facultyList.length > 0"
          background
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalFaculties"
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
import { getFacultyPage } from "@/wanglingyu/api/import";

export default {
  data() {
    return {
      dialogVisible: false,
      uploadUrl: "http://localhost:20235/faculty/import",
      file: null,
      currentPage: 1,
      pageSize: 10,
      facultyList: [], // 学生列表数据
      totalFaculties: 0, // 总学生数
    };
  },
  mounted() {
    this.fetchFacultyList();
  },
  methods: {
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize; // 返回表格序号
    },
    async fetchFacultyList() {
      const response = await getFacultyPage(this.currentPage, this.pageSize);
      this.facultyList = response.data.data.rows; // 将数据赋值给facultyList
      this.totalFaculties = response.data.data.total; // 设置总学生数
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
      this.fetchFacultyList();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.fetchFacultyList();
    },
  },
};
</script>
  