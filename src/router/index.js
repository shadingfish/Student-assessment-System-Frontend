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
        component: () => import('@/views/ReportView')
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
        component: () => import('@/views/evals/GpaEvalView')
      },
      {
        path: '/judge/summary-eval',
        name: '个人学年总结评审',
        component: () => import('@/views/evals/SummaryEvalView')
      },
      {
        path: '/judge/volunteer-eval',
        name: '志愿服务评审',
        component: () => import('@/views/evals/VolunteerEvalView')
      },
      {
        path: '/judge/research-eval',
        name: '科研情况评审',
        component: () => import('@/views/evals/ResearchEvalView')
      },
      {
        path: '/judge/service-eval',
        name: '学生服务岗位评审',
        component: () => import('@/views/evals/ServiceEvalView')
      },
      {
        path: '/judge/competition-eval',
        name: '竞赛得奖评审',
        component: () => import('@/views/evals/CompetitionEvalView')
      },
      {
        path: '/judge/practice-eval',
        name: '社会实践评审',
        component: () => import('@/views/evals/PracticeEvalView')
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
