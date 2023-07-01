<!-- 成绩汇总页面 -->
<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导入学生名单</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>成绩汇总</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导出</template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-button @click="sumTableVisible = true">查看汇总表</el-button>
                <el-button @click="resetDateFilter">清除日期过滤器</el-button>
<!--                <el-button @click="clearFilter">清除所有过滤器</el-button>-->

                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <el-main>
<!--                <el-table :data="tableData">
                    <el-table-column prop="date" label="创建日期" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="审核员姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="category" label="打分表类型">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template>
                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看打分表</el-button>
                        </template>
                    </el-table-column>
                </el-table>-->
                <el-table ref="filterTable"
                          :data="tableData"
                          style="width: 100%; text-align: center">
                    <el-table-column
                        align="center"
                        prop="date"
                        label="创建日期"
                        sortable
                        column-key="date"
                        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                        :filter-method="filterHandler"
                    >
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="审核员姓名">
                    </el-table-column>
                    <el-table-column align="center" prop="id" label="工号">
                    </el-table-column>
                    <el-table-column align="center" prop="category" label="打分表类型">
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作">
                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看打分表</el-button>
                    </el-table-column>
                </el-table>
            </el-main>

            <el-dialog width="900px" title="xxx - xxx打分表"
                       :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                    <el-table-column align="center" property="name" label="姓名"></el-table-column>
                    <el-table-column align="center" property="date" label="审核时间"></el-table-column>
                    <el-table-column align="center" property="id" label="学号"></el-table-column>
                    <el-table-column align="center" property="grade" label="年级"></el-table-column>
                    <el-table-column align="center" property="tag" label="专业" width="250px"></el-table-column>
                    <el-table-column align="center" property="score" label="得分"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">返回</el-button>
                    <el-button type="primary" @click="exportTable">导出表格</el-button>
                </div>
            </el-dialog>

            <el-dialog width="1200px" title="汇总表" :visible.sync="sumTableVisible">
                <el-table :data="sumData">
                    <el-table-column align="center" property="name" label="姓名"></el-table-column>
                    <el-table-column align="center" property="id" label="学号" width="150px"></el-table-column>
                    <el-table-column align="center" property="personal_score" label="学年总结得分"></el-table-column>
                    <el-table-column align="center" property="volunteer_score" label="志愿服务得分"></el-table-column>
                    <el-table-column align="center" property="gpa_score" label="成绩得分"></el-table-column>
                    <el-table-column align="center" property="science_score" label="科研情况得分"></el-table-column>
                    <el-table-column align="center" property="employee_score" label="服务岗位得分"></el-table-column>
                    <el-table-column align="center" property="competition_score" label="竞赛得奖得分"></el-table-column>
                    <el-table-column align="center" property="social_score" label="社会实践得分"></el-table-column>
                    <el-table-column align="center" property="sum_score" label="总得分"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="sumTableVisible = false">返回</el-button>
                    <el-button type="primary" @click="exportTable">导出表格</el-button>
                </div>
            </el-dialog>

        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
.el-dialog {
    width: 90vw;
}
.el-dropdown{
    margin-left: 1em;
}
</style>

<script>
export default {
    data() {
        return {
            dialogTableVisible: false,
            sumTableVisible: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                id: '2018301010456',
                category: '科研评分表',
            }, {
                date: '2016-05-04',
                name: '李晓文',
                id: '2018301010457',
                category: '志愿评分表',
            }, {
                date: '2016-05-01',
                name: '张三',
                id: '2018301010458',
                category: 'GPA评分表',
            }, {
                date: '2016-05-03',
                name: '李四',
                id: '2019301010457',
                category: '志愿评分表',
            }, {
                date: '2016-05-03',
                name: '王五',
                id: '2020301010457',
                category: 'GPA评分表',
            }, {
                date: '2016-05-03',
                name: '李梅梅',
                id: '2020301010468',
                category: '志愿评分表',
            }, {
                date: '2016-05-01',
                name: '韦小宝',
                id: '2021301010468',
                category: '科研评分表',
            }],
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                id: '2018301010456',
                grade: '2022',
                tag: '软件工程',
                score: '99'
            }, {
                date: '2016-05-04',
                name: '李晓文',
                id: '2018301010457',
                grade: '2021',
                tag: '软件工程',
                score: '95'
            }, {
                date: '2016-05-01',
                name: '张三',
                id: '2018301010458',
                grade: '2019',
                tag: '计算机科学',
                score: '80'
            }, {
                date: '2016-05-03',
                name: '李四',
                id: '2019301010457',
                grade: '2018',
                tag: '软件工程',
                score: '90'
            }, {
                date: '2016-05-03',
                name: '王五',
                id: '2020301010457',
                grade: '2017',
                tag: '机械设计制造及其自动化',
                score: '87'
            }, {
                date: '2016-05-03',
                name: '李梅梅',
                id: '2020301010468',
                grade: '2022',
                tag: '野生动物与自然保护区管理',
                score: '88'
            }, {
                date: '2016-05-01',
                name: '韦小宝',
                id: '2021301010468',
                grade: '2018',
                tag: '野生动物与自然保护区管理',
                score: '91'
            }],
            sumData: [{
                name: '王小虎',
                id: '2018301010456',
                personal_score: '75',
                volunteer_score: '89',
                gpa_score: '99',
                science_score: '99',
                employee_score: '99',
                competition_score: '99',
                social_score: '99',
                sum_score: '95',
            }, {
                name: '韦小宝',
                id: '2021301010468',
                personal_score: '75',
                volunteer_score: '89',
                gpa_score: '99',
                science_score: '99',
                employee_score: '99',
                competition_score: '99',
                social_score: '99',
                sum_score: '95',
            }, {
                name: '韦小宝',
                id: '2021301010468',
                personal_score: '75',
                volunteer_score: '89',
                gpa_score: '99',
                science_score: '99',
                employee_score: '99',
                competition_score: '99',
                social_score: '99',
                sum_score: '95',
            }, {
                name: '韦小宝',
                id: '2021301010468',
                personal_score: '75',
                volunteer_score: '89',
                gpa_score: '99',
                science_score: '99',
                employee_score: '99',
                competition_score: '99',
                social_score: '99',
                sum_score: '95',
            }, {
                name: '韦小宝',
                id: '2021301010468',
                personal_score: '75',
                volunteer_score: '89',
                gpa_score: '99',
                science_score: '99',
                employee_score: '99',
                competition_score: '99',
                social_score: '99',
                sum_score: '95',
            }],
            fileList: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            ],
        }
    },
    methods: {
        exportTable() {
            // 下载所有文件
            // ...
        },
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        // eslint-disable-next-line no-unused-vars
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
    }
};
</script>
