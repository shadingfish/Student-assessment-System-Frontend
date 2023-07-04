import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/auth/RegisterView.vue')
  },
  // {
  //   path: '/researchReport',
  //   name: 'researchReport',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/reports/ResearchReportView.vue')
  // },
  // {
  //   path: '/researchEval',
  //   name: 'researchEval',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/evals/ResearchEvalView.vue')
  // },
  // {
  //   path: '/practiceReport',
  //   name: 'practiceReport',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/reports/PracticeReportView.vue')
  // },
  // {
  //   path: '/practiceEval',
  //   name: 'practiceEval',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/evals/PracticeEvalView.vue')
  // },
  {
    path: '/',
    redirect: '/student',
    hidden: true
  },
  // 登录页面
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
      },
      {
        path: '/student/summary',
        name: '学年总结填报',
        component: () => import('@/wangdy55/views/SummaryReportView'),
        meta: { title: 'Summary Report', icon: 'el-icon-edit'}
      },
      {
        path: '/student/volunteer',
        name: '志愿填报',
        component: () => import('@/wangdy55/views/VolunteerReportView'),
        meta: { title: 'Volunteer Report', icon: 'el-icon-edit'}
      },
      {
        path: '/student/AddComp',
        name: '竞赛获奖填报',
        component: () => import('@/wuqile/views/AddComp'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/student/AddOccupation',
        name: '学工服务填报',
        component: () => import('@/wuqile/views/AddOccupation'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/researchReport',
        name: '科研成果填报',
        component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/reports/ResearchReportView.vue')
      },
      {
        path: '/practiceReport',
        name: '社会实践填报',
        component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/reports/PracticeReportView.vue')
      },
    ]
  },
  {
    path: '/eval',
    name: '评委页面', icon: 'el-icon-paperclip',
    component: () => import('@/layout'),
    redirect: '/eval/gpa',
    children: [
      {
        path: '/eval/gpa',
        name: '学生成绩审核',
        component: () => import('@/views/evals/GpaEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/summary',
        name: '个人学年总结评审',
        component: () => import('@/wangdy55/views/SummaryEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/volunteer',
        name: '志愿服务评审',
        component: () => import('@/views/evals/VolunteerEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/research',
        name: '科研情况评审',
        component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/evals/ResearchEvalView.vue')
      },
      {
        path: '/eval/service',
        name: '学生服务岗位评审',
        component: () => import('@/wuqile/views/ServiceEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/competition',
        name: '竞赛得奖评审',
        component: () => import('@/wuqile/views/CompetitionEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/practice',
        name: '社会实践评审',
        component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/evals/PracticeEvalView.vue'),
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
        component: () => import('@/wanglingyu/views/ImportListView')
      },
      {
        path: '/admin/collect',
        name: '成绩汇总',
        component: () => import('@/wangdy55/views/CollectResultView')
      },
      {
        path: '/admin/output',
        name: '成绩导出',
        component: () => import('@/yudingyi/views/admins/OutputView.vue')
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
