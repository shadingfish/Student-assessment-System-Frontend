import service from '@/utils/service';

// 导入学生名单
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

  export function getStuPage(page, pageSize){
      const data = {
        page,
        pageSize
      }
      return service({
        url:'/student/page',
        method:'get',
        params:data
      })
  }

// 导入教职工名单
  export function importFaculty(file) {
    const data = {
      file
    }
    return service({
      url: '/faculty/import',
      method: 'post',
      data: data
    })
  }

  export function getFacultyPage(page, pageSize){
      const data = {
        page,
        pageSize
      }
      return service({
        url:'/faculty/page',
        method:'get',
        params:data
      })
  }


  // 导入GPA
  export function importGpa(file) {
    const data = {
      file
    }
    return service({
      url: '/gpa/import',
      method: 'post',
      data: data
    })
  }

  export function getGpaPage(page, pageSize){
      const data = {
        page,
        pageSize
      }
      return service({
        url:'/gpa/page',
        method:'get',
        params:data
      })
  }