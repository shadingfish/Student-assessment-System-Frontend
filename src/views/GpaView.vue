<template>
  <div>
    <h1>学生成绩填报</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="gpa" label="GPA" > </el-table-column>
      <el-table-column prop="score" label="分数" > </el-table-column>
      <el-table-column prop="state" label="状态" > </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleConfirm(scope.$index, scope.row)"
            >确认</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="dialogFormVisible = true"
            >申诉</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="申诉理由"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <el-form :model="form">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAppeal()"
          >确认提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          gpa: 3.8,
          score: 80,
          state: "未确认",
        },
      ],
      dialogFormVisible: false,
      

      form: {
        textarea: '',
      },
    };
  },
  methods: {
    handleConfirm(index, row) {
      console.log(index, row);
      //学生确认成绩
      //……
      row.state = "已确认";
    },
    submitAppeal(){
      //提交申诉
      //……

      this.dialogFormVisible = false;
    }
  },
};
</script>
  