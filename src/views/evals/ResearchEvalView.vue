<!-- 科研情况评审页面 -->
<template>
    <div class="science_admin">
        <h1>科研情况审核</h1>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="primary" icon="el-icon-share"></el-button>
                    <el-button type="primary" icon="el-icon-delete"></el-button>
                </el-button-group>
                <el-button @click="resetDateFilter">清除日期过滤器</el-button>
                <el-button @click="clearFilter">清除所有过滤器</el-button>
            </el-header>

            <el-main style="text-align: center">
                <el-table ref="filterTable"
                          :data="tableData"
                          style="width: 100%; text-align: center">
                    <el-table-column align="center" prop="status" label="情况">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="date"
                        label="提交日期"
                        sortable
                        column-key="date"
                        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                        :filter-method="filterHandler"
                    >
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column align="center" prop="id" label="学号">
                    </el-table-column>
                    <el-table-column align="center" prop="grade" label="年级">
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作">
                        <template>
                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看</el-button>
                            <el-button type="text" size="small" @click="returnVisible = true">打回</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="tag"
                        label="专业"
                        :filters="[
                            { text: '软件工程', value: '软件工程' },
                            { text: '机械设计制造及其自动化', value: '机械设计制造及其自动化' },
                            { text: '野生动物与自然保护区管理', value: '野生动物与自然保护区管理' },
                            { text: '计算机科学', value: '计算机科学' }
                            ]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.tag === '软件工程' ? 'primary' : 'success'"
                                disable-transitions>{{scope.row.tag}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>

                <div style="display: flex; align-items: center;">
                    <el-input style="width: 500px;" v-model="inputContent" class="searchinput" placeholder="请输入姓名或学号进行查询" prefix-icon="el-icon-search" >
                    </el-input>
                    <el-button class="searchbtn" @click="searchput">搜索</el-button>
                </div>

                <el-dialog width="1200px" title="xxx科研情况" :visible.sync="dialogTableVisible">
                    <el-table :data="gridData" max-height="400px">
                        <el-table-column align="center" property="product" label="成果" width="700px"></el-table-column>
                        <el-table-column align="center" property="category" label="类型"></el-table-column>
                        <el-table-column align="center" property="time" label="产出时间"></el-table-column>
                        <el-table-column align="center" property="level" label="层次" width="150px"></el-table-column>
                        <el-table-column align="center" property="score" label="得分"></el-table-column>
                    </el-table>
                    <el-table :data="fileList" style="width: 100%" max-height="200px">
                        <el-table-column align="center" prop="name" label="佐证文件" width="700px"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="downloadFile(scope.row)">下载</el-button>
                                <el-button type="primary" size="mini" @click="openFile(scope.row)">打开</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="downloadAllFiles">下载所有文件</el-button>
                        <el-button @click="dialogTableVisible = false">返回</el-button>
                        <el-button type="primary" @click="dialogTableVisible = false">标记合格</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title="打回提示"
                    :visible.sync="returnVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                    </el-input>
                    <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="returnVisible = false">取 消</el-button>
                    <el-button type="primary" size="mini" @click="returnVisible = false">发送</el-button>
                     </span>
                </el-dialog>


                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    background="true"
                    layout="prev, pager, next"
                    :total="count"
                    class="fenye">
                </el-pagination>

            </el-main>
        </el-container>
    </div>
</template>


<style scoped lang="scss">
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-button {
    margin: 0.5em;
}

.el-table th,
.el-table td {
    white-space: nowrap;
    div.cell{
        text-align: center;
    }
    .is-center{
        text-align: center;
    }
}

.el-table .el-table__header th div {
    text-align: center;
}

.el-table .el-table__body td div {
    text-align: center;
}

.el-table-column{
    width:auto
}
</style>

<script>
import Vue from 'vue';
import Plugin from 'v-fit-columns';
Vue.use(Plugin);
export default {
    data() {
        return {
/*            computed:{
                tables() {
                    const search = this.searchContent;
                    //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
                    if(this.inputContent===''){
                        this.searchContent=''
                        this.currentPage=1
                        return [this.tableData,this.count=this.tableData.length];
                    }
                    if (search!=='') {
                        return [this.tableData.filter((dataNews) => {
                            return Object.keys(dataNews).some((key) => {
                                return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
                            });
                        }),
                            this.count = this.tableData.filter((dataNews) => {
                                return Object.keys(dataNews).some((key) => {
                                    return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
                                });
                            }).length];
                    }
                    return [this.tableData,this.count=this.tableData.length];
                }
            },*/
            searchContent:'',
            inputContent:'',
            currentPage: 1,
            pageSize: 12,
            textarea: '',
            gridData: [{
                product: '波特五力模型分析框架及案例分享——以瑞幸咖啡为例',
                category: '学术论文',
                time: '2016-05-04',
                level: '三区，一作',
                score: '30'
            }, {
                product: '一种组合型萤石粉球团粘合剂及其应用',
                category: '实用新型专利',
                time: '在审',
                level: '一作',
                score: '15'
            }, {
                product: '中国国际互联网+大学生创兴创业竞赛',
                category: '竞赛',
                time: '2016-05-04',
                level: '国家级一等奖，队长',
                score: '30'
            }, {
                product: '财务共享模式下企业营运资金管理绩效研究——基于海尔集团2007～2014年的纵向案例',
                category: '学术论文',
                time: '2019-07-09',
                level: 'SCI，二作',
                score: '20'
            }],
            dialogTableVisible: false,
            returnVisible: false,
            fileList: [
                {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            ],
            tableData: [{
                status: '未审核',
                date: '2016-05-02',
                name: '王小虎',
                id: '2018301010456',
                grade: '2022',
                tag: '软件工程'
            }, {
                status: '未审核',
                date: '2016-05-04',
                name: '李晓文',
                id: '2018301010457',
                grade: '2021',
                tag: '软件工程'
            }, {
                status: '打回中',
                date: '2016-05-01',
                name: '张三',
                id: '2018301010458',
                grade: '2019',
                tag: '计算机科学'
            }, {
                status: '已审核',
                date: '2016-05-03',
                name: '李四',
                id: '2019301010457',
                grade: '2018',
                tag: '软件工程'
            }, {
                status: '已审核',
                date: '2016-05-03',
                name: '王五',
                id: '2020301010457',
                grade: '2017',
                tag: '机械设计制造及其自动化'
            }, {
                status: '已审核',
                date: '2016-05-03',
                name: '李梅梅',
                id: '2020301010468',
                grade: '2022',
                tag: '野生动物与自然保护区管理'
            }, {
                status: '打回中',
                date: '2016-05-01',
                name: '韦小宝',
                id: '2021301010468',
                grade: '2018',
                tag: '野生动物与自然保护区管理'
            }]
        }
    },
    methods: {
        searchput(){
            this.searchContent=this.inputContent
            console.log(this.searchContent)
        },
        handleSizeChange(val){
            this.pageSize=val;
        },
        handleCurrentChange(val){
            this.currentPage=val;
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
        downloadFile() {
            // 下载单个文件
            // ...
        },
        openFile() {
            // 打开单个文件
            // ...
        },
        downloadAllFiles() {
            // 下载所有文件
            // ...
        },
        /*tables() {
            const search = this.searchContent;
            //当将input框清空时，使列表自动展示搜索前的完整数据，并返回至首页，防止叠加搜索
            if(this.inputContent===''){
                this.searchContent=''
                this.currentPage=1
                return [this.tableData,this.count=this.tableData.length];
            }
            if (search!=='') {
                return [this.tableData.filter((dataNews) => {
                    return Object.keys(dataNews).some((key) => {
                        return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
                    });
                }),
                    this.count = this.tableData.filter((dataNews) => {
                        return Object.keys(dataNews).some((key) => {
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
                        });
                    }).length];
            }
            return [this.tableData,this.count=this.tableData.length];
        }*/
    }
}
</script>
