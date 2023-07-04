import service from "@/utils/service"
export function getEval(evalRecord) {
    const data=evalRecord
    return service({
        url: '/student/get-list',
        method: 'get',
        data:data
    })
}

export function insertEval(evalRecord) {
    const data=evalRecord
    return service({
        url: '/eval-record/insert',
        method: 'post',
        data:data
    })
}