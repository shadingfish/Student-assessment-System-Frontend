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