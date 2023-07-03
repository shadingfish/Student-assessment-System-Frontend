import service from '@/utils/service'

export function addVolunteerActivityApi(data) {
  return service({
    method: 'post',
    url: '/volunteer',
    data
  })
}

export function addVolunteerFileApi(targetId, file) {
  return service({
    method: 'post',
    url: `/volunteer/file/${targetId}`,
    data: file
  })
}