import service from '@/utils/service'

export function summitSummaryApi(data) {
  return service({
    method: 'post',
    url: '/summary',
    data
  })
}

export function getSummaryApi() {
  return service({
    method: 'get',
    url: `/summary`
  })
}