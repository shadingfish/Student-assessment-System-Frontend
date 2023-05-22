import request from '@/utils/request'
// 修改信息
//学生提交填写好的科研信息
export function researchSubmit(reqVo) {
    return request({
        url: '/research/insert',
        method: 'post',
        data: reqVo
    })
}

//老师提交打出的分数
export function scoreSubmit(score) {
    return request({
        url: '/research/give-score',
        method: 'post',
        data: score
    })
}
