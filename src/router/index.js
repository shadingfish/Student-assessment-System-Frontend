import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/student',
    hidden: true
  },
  {
    path: '/student',
    name: '学生页面', icon: 'el-icon-edit',
    component: () => import('@/layout'),
    redirect: '/student/report',
    children: [
      {
        path: '/student/report',
        name: '在线填报',
        component: () => import('@/views/ReportView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      }
    ]
  },
  {
    path: '/judge',
    name: '评委页面', icon: 'el-icon-paperclip',
    component: () => import('@/layout'),
    redirect: '/judge/gpa-eval',
    children: [
      {
        path: '/judge/gpa-eval',
        name: '学生成绩审核',
        component: () => import('@/views/evals/GpaEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/summary-eval',
        name: '个人学年总结评审',
        component: () => import('@/views/evals/SummaryEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/volunteer-eval',
        name: '志愿服务评审',
        component: () => import('@/views/evals/VolunteerEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/research-eval',
        name: '科研情况评审',
        component: () => import('@/views/evals/ResearchEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/service-eval',
        name: '学生服务岗位评审',
        component: () => import('@/views/evals/ServiceEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/competition-eval',
        name: '竞赛得奖评审',
        component: () => import('@/views/evals/CompetitionEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/judge/practice-eval',
        name: '社会实践评审',
        component: () => import('@/views/evals/PracticeEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      }
    ]
  },
  {
    path: '/admin',
    name: '学工页面', icon: 'el-icon-s-check',
    component: () => import('@/layout'),
    redirect: '/admin/import',
    children: [
      {
        path: '/admin/import',
        name: '导入学生名单',
        component: () => import('@/views/admins/ImportListView')
      },
      {
        path: '/admin/collect',
        name: '成绩汇总',
        component: () => import('@/views/admins/CollectResultView')
      },
      {
        path: '/admin/output',
        name: '成绩导出',
        component: () => import('@/views/admins/OutputView')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: res => require(['@/views/NotFoundView'], res), // 异步加载
    hidden: true
  }
];

const router = new Router({
  mode: "history",
  routes
});

export default router;
