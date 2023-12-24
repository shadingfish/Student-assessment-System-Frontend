import service from '@/utils/service'
import * as summaryApis from './summary'
import * as volunteerApis from './volunteer'

export {
  summaryApis,
  volunteerApis
}

export function getSummaryRecordApi(params) {
  return service({
    method: 'get',
    url: '/eval/summary/list',
    params
  })
}

export function putSummaryRecordApi(data) {
  return service({
    method: 'put',
    url: '/eval/summary',
    data
  })
}

export function getMenuByRoleIdApi() {
  return service({
    method: 'get',
    url: '/menu'
  })
}

export function getEvalResultListApi(scholarship, acYear) {
  return service({
    method: 'get',
    url: '/eval-result/list',
    params: {
      scholarship,
      acYear
    }
  })
}