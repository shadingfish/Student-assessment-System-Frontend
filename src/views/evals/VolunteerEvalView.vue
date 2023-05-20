<!-- 志愿服务评审页面 -->
<template>
    <div>
        <h1>志愿服务申报</h1>
        <h3>上传志愿时长</h3>
        <input type="file" @change="handleFileUpload">
        <button @click="uploadData">上传</button>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="志愿北京">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="院级活动" name="type"></el-checkbox>
                    <el-checkbox label="校级活动" name="type"></el-checkbox>
                    <el-checkbox label="省级活动" name="type"></el-checkbox>
                    <el-checkbox label="国家级活动" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="经费来源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="学校基金"></el-radio>
                    <el-radio label="自费或赞助"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="志愿时长">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即申报</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <h3>志愿时长评审</h3>
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="服务时长"
                sortable
                width="180"
                column-key="date"
                :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="志愿名称"
                :formatter="formatter">
            </el-table-column>

            <el-table-column
                prop="tag"
                label="标签"
                width="100"
                :filters="[{ text: '通过', value: '通过' }, { text: '不通过', value: '不通过' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.tag === '通过' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            file: null,
            records: [], // 上传的数据
            requests: [], // 学生订正志愿时长的请求
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadData() {
            const data = new FormData();
            data.append('file', this.file);

            const response = await fetch('/upload', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                this.records = result.records;
                this.requests = result.requests;
            }
        },
        async handleRequest(request) {
            const response = await fetch(`/correct-hours/${request.id}`, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                request.status = '已处理';
            }
        },
    },
};
</script>
