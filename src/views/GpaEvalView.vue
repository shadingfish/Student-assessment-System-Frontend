<template>
  <div>
    <h1>学生成绩审核</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'stuNum' }"
    >
      <el-table-column prop="stuNum" label="学号" sortable> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="gpa" label="GPA" sortable> </el-table-column>
      <el-table-column prop="score" label="分数" sortable> </el-table-column>
      <el-table-column
        prop="tag"
        label="状态"
        :filters="[
          { text: '学生未确认', value: '学生未确认' },
          { text: '学生已确认', value: '学生已确认' },
          { text: '评委已确认', value: '评委已确认' },
          { text: '申诉中', value: '申诉中' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.tag === '学生未确认'
                ? 'info'
                : scope.row.tag === '学生已确认'
                ? 'primary'
                : scope.row.tag === '评委已确认'
                ? 'success'
                : 'danger'
            "
            close-transition
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="gpaConfirm(scope.$index, scope.row)"
            type="text"
            size="small"
            >确认</el-button
          >
          <el-button
            @click="sendReminder(scope.$index, scope.row)"
            type="text"
            size="small"
            >提醒</el-button
          >
          <el-button
            @click="handleAppeal(scope.$index, scope.row)"
            type="text"
            size="small"
            >处理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    

    <el-dialog title="申诉处理" :visible.sync="AppealVisible" center>
      <el-input type="textarea" :rows="5" v-model="textarea" readonly="true">
        {{ textarea }}
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AppealVisible = false">取 消</el-button>
        <el-button type="danger" @click="rejectAppeal()">驳回申请</el-button>
        <el-button type="primary" @click="acceptAppeal()">修改成绩</el-button>
      </div>
    </el-dialog>
  </div>
</template>




<script>
export default {
  data() {
    return {
      textarea: "成绩评定有误",
      tableData: [
        {
          stuNum: "2200022901",
          name: "张一",
          gpa: "3.9",
          score: "80",
          tag: "学生已确认",
          appeal: "true",
        },
        {
          stuNum: "2200022902",
          name: "张二",
          gpa: "3.9",
          score: "80",
          tag: "评委已确认",
        },
        {
          stuNum: "2200022903",
          name: "张三",
          gpa: "3.9",
          score: "80",
          tag: "学生未确认",
        },
        {
          stuNum: "2200022904",
          name: "张四",
          gpa: "3.9",
          score: "80",
          tag: "申诉中",
        },
        {
          stuNum: "2200022905",
          name: "张五",
          gpa: "3.9",
          score: "80",
          tag: "学生未确认",
        },
        {
          stuNum: "2200022906",
          name: "张六",
          gpa: "3.9",
          score: "80",
          tag: "申诉中",
        },
      ],
      AppealVisible: false,
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },

    gradeConfirm(index, row) {
      console.log(index, row);
      //弹窗

      if (row.tag == "学生已确认") {
        this.$confirm("确认分数无误?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        })
          .then(() => {
            //确认
            //……
            row.tag = "评委已确认";

            this.$message({
              type: "success",
              message: "确认成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消确认",
            });
          });
      }
    },

    sendReminder(index, row) {
      console.log(index, row);
      //弹窗
      if (row.tag == "学生未确认") {
        this.$confirm("提醒学生确认成绩?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //发送提醒
            //……
            this.$message({
              type: "success",
              message: "已发送提醒!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消发送提醒",
            });
          });
      }
    },

    handleAppeal(index, row) {
      console.log(index, row);

      if (row.tag == "申诉中") {
        this.AppealVisible = true;
      }
    },

    rejectAppeal() {
      // 驳回申诉，发送通知
      // ……

      this.AppealVisible = false;
      this.$message({
        type: "danger",
        message: "已驳回申请!",
      });
    },
    acceptAppeal() {
      // 接受申诉，修改成绩
      // ……

      this.AppealVisible = false;
      this.$message({
        type: "success",
        message: "已修改成绩!",
      });
    },
  },
};
</script>
  