import request from '@/utils/request'

// 获取学生的所有科研
export function getResearchList(){
    return request({
        url: '/research/mylist',
        method: 'get',
    })
}

export function getList(id) {
    return request({
        url: '/research/get-list',
        method: 'get',
        params: { id }
    })
}

export function uploadResearchFile(){
    return request({
        url: '/file/upload',
        method: 'post',
    })
}

//学生提交填写好的科研信息
export function submitResearch(reqVo) {
    return request({
        url: '/research/insert',
        method: 'post',
        data: reqVo
    })
}

// 删除信息
export function deleteResearch( id ) {
    return request({
        url: '/research/delete',
        method: 'post',
        params: { id }
    })
}

// 修改信息
export function checkResearch() {
    return request({
        url: '/research/check',
        method: 'get',
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
