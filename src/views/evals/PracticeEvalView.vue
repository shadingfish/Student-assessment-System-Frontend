<!-- 社会实践评审页面 -->
<template>
    <div>
        <h2>社会实践评审</h2>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="实践名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="社会实践内容">
            </el-table-column>
        </el-table>
        <form>
            <label for="score">评分:</label>
            <input type="number" id="score" name="score" v-model="score" min="0" max="100" required>
            <br><br>
            <label for="materials">材料:</label>
            <input type="file" id="materials" name="materials" accept="application/pdf,image/*" @change="handleFileUpload">
            <br><br>
            <button type="submit" @click.prevent="submitForm">提交</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {

        return {
            tableData: [{
                date: '五一劳动月',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄参加脱口秀大会'
            }, {
                date: '为名论坛',
                name: '王小虎',
                address: '北京大学马克思主义学院参加为名论坛，为老师播放PPT讲稿'
            }, {
                date: '寒假社会实践',
                name: '王小虎',
                address: '前往上海市普陀区金沙江路街道办做临时工作，为人民服务'
            }, {
                date: '远程家教辅导',
                name: '王小虎',
                address: '线上辅导西部山区儿童英语学习'
            }],


            score: null,
            materials: null
        }
    },
    methods: {
        handleFileUpload(event) {
            this.materials = event.target.files[0];
        },
        submitForm() {
            // 根据打分细则进行评分
            // 将分数和材料上传到后端进行处理
        }
    }
}
</script>
