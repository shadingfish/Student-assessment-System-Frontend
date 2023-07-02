import request from '@/utils/request'

// 获取学生的所有科研
export function getPracticeList(){
    return request({
        url: '/practice/mylist',
        method: 'get',
    })
}

export function getPraEvalList(id) {
    return request({
        url: '/practice/get-list',
        method: 'get',
        params: { id }
    })
}

export function uploadPracticeFile(){
    return request({
        url: '/file/upload',
        method: 'post',
    })
}

//学生提交填写好的科研信息
export function submitPractice(reqVo) {
    return request({
        url: '/practice/insert',
        method: 'post',
        data: reqVo
    })
}

// 删除信息
export function deletePractice( id ) {
    return request({
        url: '/practice/delete',
        method: 'post',
        params: { id }
    })
}

// 修改信息
export function checkPractice() {
    return request({
        url: '/practice/check',
        method: 'get',
    })
}


//老师提交打出的分数
export function pracScoreSubmit(score) {
    return request({
        url: '/practice/give-score',
        method: 'post',
        data: score
    })
}
