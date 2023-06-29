import request from '@/utils/request'

//导出表格
export function exportTable(table_name) {
    return request({
        url: '/export/table',
        method: 'get',
        responseType: 'blob',
        params: {
            table_name: table_name
        }
    })
}



