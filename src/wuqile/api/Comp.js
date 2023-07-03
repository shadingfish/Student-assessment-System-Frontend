import service from "@/utils/service"
export function insertComp(Comp) {
    const data=Comp
    return service({
        url: '/competition/insert',
        method: 'post',
        data:data
    })
}

export function getComp() {
    return service({
        url: '/competition/get-list',
        method: 'get',
    })
}

export function updateComp(Comp) {
    const data=Comp
    return service({
        url: '/competition/update',
        method: 'put',
        data:data
    })
}

export function deleteComp(matId) {
    return service({
        url: '/competition/delete',
        method: 'delete',
        params:{
            matId:matId
        }
    })
}
