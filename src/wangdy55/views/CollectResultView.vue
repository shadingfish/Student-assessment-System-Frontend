<!-- 成绩汇总页面 -->
<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-container>
            <el-table :data="evalResultList" border style="width: 100%">
                <el-table-column prop="cardId" label="学号"></el-table-column>
                <el-table-column prop="evalStatus" label="审核状态"></el-table-column>
                <el-table-column prop="gpaScore" label="GPA得分"></el-table-column>
                <el-table-column prop="occupScore" label="学生骨干岗位得分" width="150px"></el-table-column>
                <el-table-column prop="practiceScore" label="社会实践得分"></el-table-column>
                <el-table-column prop="reportScore" label="个人报告得分"></el-table-column>
                <el-table-column prop="researchScore" label="科研成果得分"></el-table-column>
                <el-table-column prop="volunScore" label="志愿服务得分"></el-table-column>
                <el-table-column prop="awardScore" label="竞赛获奖得分"></el-table-column>
                <el-table-column prop="totalScore" label="综合得分"></el-table-column>
            </el-table>
        </el-container>
    </el-container>
</template>

<script>
import { getEvalResultListApi } from '@/wangdy55/api'

export default {
    data() {
        return {
            evalResultList: [],
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
    created() {
        this.getEvalResultList('国家奖学金', '2022-2023')
    },
    methods: {
        getEvalResultList(scholarship, acYear) {
            getEvalResultListApi(scholarship, acYear).then(res => {
                this.evalResultList = res.data.data
                this.evalResultList.forEach(evalResult => {
                    evalResult.totalScore = (evalResult.gpaScore + evalResult.occupScore + evalResult.practiceScore + evalResult.reportScore + evalResult.researchScore + evalResult.volunScore + evalResult.awardScore) / 7
                    evalResult.totalScore = evalResult.totalScore.toFixed(2)
                })
            })
        },
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

