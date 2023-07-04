import service from '@/utils/service'
import remoteService from '@/wangdy55/utils/remoteService'

export function addVolunteerActivityApi(data) {
  return service({
    method: 'post',
    url: '/volunteer',
    data
  })
}

export function addVolunteerFileApi(file) {
  return service({
    method: 'post',
    url: '/api/upload',
    data: file
  })
}

export function getVolunteerActivityList() {
  return service({
    method: 'get',
    url: '/volunteer/list'
  })
}

export function deleteVolunteerActivity(id) {
  return service({
    method: 'delete',
    url: `/volunteer/${id}`,
  })
}

export function download(filename) {
  return remoteService({
    method: 'get',
    url: `api/downloadFiles/${filename}`,
    responseType: 'blob'
  })
}

export function submitVolunteerRecord() {
  return service({
    method: 'post',
    url: `/volunteer/submit`,
  })
}

// 评审接口
export function getVolunteerRecordList() {
  return service({
    method: 'get',
    url: '/eval/volunteer/list'
  })
}

export function getVolunteerActivities(cardId) {
  return service({
    method: 'get',
    url: `/eval/volunteer/${cardId}`
  })
}

export function updateVolunteerRecord(data) {
  return service({
    method: 'put',
    url: '/eval/volunteer',
    data
  })
}