<!-- 导入学生名单页面 -->
<template>
  <div>
    <h1>导入学生名单</h1>
    <el-container>
      <el-header
        ><el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".xlsx, .xls"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button type="primary">点击上传</el-button>
        </el-upload></el-header
      >
      <el-main
        ><el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            align="center"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="stuNum" label="学号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="grade" label="年级"> </el-table-column>
          <el-table-column prop="major" label="专业"> </el-table-column>
        </el-table>
      </el-main>

      <el-footer
        ><div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 5, 8, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination></div
      ></el-footer>
    </el-container>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      tableData: [
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
        {
          stuNum: "123456",
          name: "王小虎",
          grade: "2022",
          major: "软件工程",
        },
      ],
      fileList: [],
      currentPage: 1,
      pageSize: 2,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    //方法写在methods里面
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize; // 返回表格序号
    },
  },
};
</script>
 
<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>