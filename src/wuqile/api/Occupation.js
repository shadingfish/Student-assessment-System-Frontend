import service from "@/utils/service"
export function insertOccu(Occu) {
    const data=Occu
    return service({
        url: '/occupation/insert',
        method: 'post',
        data:data
    })
}
export function getOccu() {
    return service({
        url: '/occupation/get-list',
        method: 'get',
    })
}
export function updateOccu(Occu) {
    const data=Occu
    return service({
        url: '/occupation/update',
        method: 'put',
        data:data
    })
}

export function deleteOccu(matId) {
    return service({
        url: '/occupation/delete',
        method: 'delete',
        params:{
            matId:matId
        }
    })
}