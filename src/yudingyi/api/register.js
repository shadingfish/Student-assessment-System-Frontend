import request from '@/utils/request'

// 用户注册
export function register(form, path) {
    return request({
        url: path,
        method: 'post',
        data: form
    })
}
