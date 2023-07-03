import service from '@/utils/service';

// 导入名单
export function importStu(file) {
    const data = {
      file
    }
    return service({
      url: '/student/import',
      method: 'post',
      data: data
    })
  }

  export function getPage(page, pageSize){
      const data = {
        page,
        pageSize
      }
      return service({
        url:'/student/page',
        method:'get',
        data:data
      })
  }