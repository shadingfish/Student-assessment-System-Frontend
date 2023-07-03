<!-- 竞赛得奖评审页面 -->
<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-container>
            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="提交日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="id" label="学号" width="120">
                    </el-table-column>
                    <el-table-column prop="major" label="专业" width="120">
                    </el-table-column>
                    <el-table-column prop="score" label="分数">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template>
                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看提交材料</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>

            <el-dialog title="竞赛状况评分表" :visible.sync="dialogTableVisible" class="thisblack-bgc">
                <el-table :data="gridData">
                    <el-table-column property="product" label="竞赛名称"></el-table-column>
                    <el-table-column property="time" label="时间"></el-table-column>
                    <el-table-column property="level" label="竞赛级别"></el-table-column>
                    <el-table-column property="rank" label="排名"></el-table-column>
                    <el-table-column style="text-align: center;" label="操作">
                        <template>
                            <el-button size="mini" type="Info" @click="OpenCertification">查看证明材料</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否通过">
                        <template>
                            <el-checkbox></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="评估结果" width="140">
                        <template slot-scope="scope"><el-button
                                @click="Comment(scope.$index, scope.row)">编辑意见</el-button></template>

                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">返回</el-button>
                    <el-button type="primary" @click="exportTable">导出表格</el-button>
                </div>
            </el-dialog>
            <el-dialog title="评审意见" :visible.sync="CommentVisible" class="thisblack-bgc">
                <el-input placeholder="请输入内容" v-model="input" clearable>
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="CommentVisible = false">返回</el-button>
                    <el-button type="primary">确定</el-button>
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
export default {
    data() {
        const item = {
            date: '2016-6-10',
            name: '张三',
            id: '200002288821',
            major: '电气工程',
            score: '90'
        };
        return {
            tableData: Array(4).fill(item),
            options: [{
                value: '选项1',
                label: '竞赛名称错误'
            }, {
                value: '选项2',
                label: '参与时间错误'
            }, {
                value: '选项3',
                label: '级别错误'
            }, {
                value: '选项4',
                label: '排名错误'
            }],
            value: '',
            gridData: [{
                product: 'MCM-ICM数学建模比赛',
                time: '2016-05-02',
                level: '国家级',
                rank: 'No.1',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            }, {
                product: 'MCM-ICM数学建模比赛',
                time: '2016-05-02',
                level: '国家级',
                rank: 'No.1',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            }, {
                product: 'MCM-ICM数学建模比赛',
                time: '2016-05-02',
                level: '国家级',
                rank: 'No.1',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            }],
            dialogTableVisible: false,
            CommentVisible: false
        }
    },
    methods: {
        exportTable() {
            // 下载所有文件
            // ...
        },
        OpenCertification() {
            //打开证明
        },
        Comment(index, row) {
            console.log(index, row);
            this.CommentVisible = true;
        }
    }
};
</script>