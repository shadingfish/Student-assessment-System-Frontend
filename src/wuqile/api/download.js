import service from "@/utils/service"
export function getFile(path) {
    return service({
        url: '/downloadFiles/',
        method: 'get',
        responseType:'Blob',
        params:{
            path:path
        }
    })
}