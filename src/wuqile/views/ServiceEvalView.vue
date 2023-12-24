<!-- 学生骨干服务岗位任职评审页面 -->
<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-container>
            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="name" label="姓名" >
                    </el-table-column>
                    <el-table-column prop="cardId" label="学号" >
                    </el-table-column>
                    <el-table-column prop="major" label="专业" >
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleClick(scope.$index,scope.row)">评审</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-dialog title="学工服务状况评分表" :visible.sync="dialogTableVisible" class="thisblack-bgc">
                <el-table :data="gridData">
                    <el-table-column property="startDate" label="开始时间"></el-table-column>
                    <el-table-column property="endDate" label="结束时间"></el-table-column>
                    <el-table-column property="level" label="级别"></el-table-column>
                    <el-table-column property="occupation" label="职位"></el-table-column>
                    <el-table-column property="evalStatus" label="评估结果"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="Comment(scope.row)">编辑意见</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form model="eval_record">
                    <el-form-item label="评审意见">
                        <el-input v-model="eval_record.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="分数">
                        <el-input-number v-model="eval_record.score" :min="1" :max="100" label="分数"></el-input-number>
                    </el-form-item>
                    <el-form-item label="评审状态">
                    <el-select v-model="eval_record.evalStatus" placeholder="请选择状态">
                        <el-option label="待审核" value="待审核"></el-option>
                        <el-option label="已通过" value="已通过"></el-option>
                        <el-option label="未通过" value="未通过"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学年">
                    <el-select v-model="eval_record.acYear" placeholder="请选择学年" @change="GetUniqueEval">
                        <el-option label="2022-2023" value="2022-2023"></el-option>
                        <el-option label="2023-2024" value="2023-2024"></el-option>
                    </el-select>
                </el-form-item> 
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">返回</el-button>
                    <el-button type="primary" @click="updateEval">确认</el-button>              
                </div>
            </el-dialog>
            <el-dialog title="评审意见" :visible.sync="CommentVisible" class="thisblack-bgc">
                <el-form model="EvalForm">
                    <el-form-item label="评审状态">
                    <el-select v-model="EvalForm.evalStatus" placeholder="请选择状态">
                        <el-option label="待审核" value="待审核"></el-option>
                        <el-option label="已通过" value="已通过"></el-option>
                        <el-option label="未通过" value="未通过"></el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="评委评语">
                        <el-input v-model="EvalForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="查看证明材料">
                        <el-button @click="onPreview(EvalForm)">查看证明材料</el-button>
                    </el-form-item>
                    </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="CommentVisible = false">返回</el-button>
                    <el-button @click="updateForm" type="primary">确定</el-button>
                </div>
            </el-dialog>
        </el-container>
    </el-container>
</template>

<style>
.el-header {
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>

<script>
import { getToken } from '@/utils/token'
import { getStu } from '@/wuqile/api/student'
import { getOccuByCardId } from '@/wuqile/api/Occupation'
import { updateOccu } from '@/wuqile/api/Occupation';
import axios from 'axios';
import { getUniqueEval } from '../api/OccuEval';
export default {
    data() {
        return {
            EvalForm:[],
            tableData: [],
            value: '',
            gridData: [],
            dialogTableVisible: false,
            CommentVisible: false,
            CurIndex:'',
            eval_record:{
                stuId:'',
                judgeId:'',
                acYear:'',
                matType:'',
                score:'',
                evalTime:'',
                evalStatus:'',
                remark:'',
            }   
        }
    },
    mounted(){
        getStu().then((res)=>{
            this.tableData=res.data.data
        })
    },
    methods: {
        onPreview(row){
        axios({
          url: `http://43.142.90.238:20235/api/downloadFiles/${encodeURIComponent(row.fileUrl)}`,
          method: 'GET',
          responseType: 'blob', // important
        })
        .then(response => {
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64data = reader.result;
                const newWindow = window.open("", "_blank");
                newWindow.document.write('<img src="' + base64data + '" />');
            }
            reader.readAsDataURL(response.data);
        })
        .catch(error => {
          console.error('Download failed:', error);
          this.$message.error('未上传证明文件')
          // handle your error here
        });
      },
        GetUniqueEval(){
            let stuId=this.tableData[this.CurIndex];
            let type="志愿服务";
            let acYear=this.eval_record.acYear
            getUniqueEval(stuId,acYear,type).then((res)=>{
                console.log(res.data)
            })
        },
      updateForm(){
        updateOccu(this.EvalForm).then((_)=>{
          this.$message.success(_.data.message)
          location.reload()
        })
      },
        handleClick(index,row){
            this.dialogTableVisible = true
            this.CurIndex=index
            getOccuByCardId(row.cardId).then((res)=>{
                this.gridData=res.data.data
            })
        },
        updateEval(){
            //console.log(this.tableData[this.CurIndex])
            this.eval_record.stuId=this.tableData[this.CurIndex].id
            this.eval_record.matType="学生岗位"
            console.log(this.eval_record)
            axios({
                url: `http://localhost:20235/api/eval-record/insert`,
                method: 'post',
                headers:{
                    Authorization: getToken('token')
                },
                data:this.eval_record
            }).then((res)=>{
                if(res.data.message === '修改成功'){
                    this.$message.info("修改成功")
                }else if(res.data.message === '插入成功'){
                    this.$message.success("插入成功")
                }else{
                    this.$message.error(res.data.message)
                }
            }).finally(()=>{
                this.dialogTableVisible = false
            })

        },
        Comment(index) {
            this.EvalForm = Object.assign({}, index); // copy data from the row to the form
            console.log(this.EvalForm)
            this.CommentVisible = true;
        }
    }
};
</script>
