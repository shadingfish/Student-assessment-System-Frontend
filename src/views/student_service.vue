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
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

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
                    <el-table-column label="是否通过">
                        <template>
                            <el-checkbox></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核意见" width="140">
                        <template slot-scope="scope"><el-button @click="Comment(scope.$index,scope.row)">编辑意见</el-button></template>
                    </el-table-column>
                </el-table>
            </el-main>

            <el-dialog title="竞赛状况评分表" :visible.sync="dialogTableVisible" class="thisblack-bgc" >
                <el-table :data="gridData">
                    <el-table-column property="position" label="职位名称"></el-table-column>
                    <el-table-column property="starttime" label="起始时间"></el-table-column>
                    <el-table-column property="endtime" label="结束时间"></el-table-column>
                    <el-table-column property="level" label="级别"></el-table-column>
                    <el-table-column property="party" label="所属组织"></el-table-column>
                    <el-table-column style="text-align: center;" label="操作">
                        <template>
                            <el-button size="mini" type="Info" @click="OpenCertification">查看证明材料</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">返回</el-button>
                    <el-button type="primary" @click="exportTable">导出表格</el-button>
                </div>
            </el-dialog>
            <el-dialog title="评审意见" :visible.sync="CommentVisible" class="thisblack-bgc" >
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable>
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="CommentVisible = false">返回</el-button>
                    <el-button type="primary" >确定</el-button>
                </div>
            </el-dialog>
        </el-container>
    </el-container>
</template>

<style>
.el-header {
    background-color: #B3C0D1;
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
            date: '2017-6-10',
            name: '王五',
            id: '1502060775',
            major: '电气工程',
            score: '81'
        };
        return {
            tableData: Array(4).fill(item),
            gridData: [{
                position: '支部书记',
                starttime: '2016-05-02',
                endtime: '2017-05-02',
                level: '院级',
                party: '计算机学院团委',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            },
            {
                position: '支部书记',
                starttime: '2016-05-02',
                endtime: '2017-05-02',
                level: '院级',
                party: '计算机学院团委',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            },
            {
                position: '支部书记',
                starttime: '2016-05-02',
                endtime: '2017-05-02',
                level: '院级',
                party: '计算机学院团委',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            },
            {
                position: '支部书记',
                starttime: '2016-05-02',
                endtime: '2017-05-02',
                level: '院级',
                party: '计算机学院团委',
                proof: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                AdvisorComment: ''
            },],
            dialogTableVisible: false,
            CommentVisible: false
        }
    },
    methods: {
        exportTable() {
            // 下载所有文件
            // ...
        },
        OpenCertification(){
            //打开证明
        },
        Comment(index,row){
            console.log(index,row);
            this.CommentVisible= true;
        }
    }
};
</script>
