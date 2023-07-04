import service from "@/utils/service"
export function getStu() {
    return service({
        url: '/student/get-list',
        method: 'get',
    })
}