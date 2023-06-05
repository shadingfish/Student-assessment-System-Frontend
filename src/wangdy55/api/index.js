import service from '@/utils/service'

export function getSummaryRecordApi(params) {
  return service({
    method: 'get',
    url: '/eval/summary/list',
    params
  })
}

export function getSummaryApi(stuId) {
  return service({
    method: 'get',
    url: `/eval/summary/${stuId}`
  })
}

export function putSummaryRecordApi(data) {
  return service({
    method: 'put',
    url: '/eval/summary',
    data
  })
}