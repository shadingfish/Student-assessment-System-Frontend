import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/yudingyi/views/auth/RegisterView.vue')
  },
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
      }
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
        component: () => import('@/yudingyi/views/evals/ResearchEvalView.vue')
      },
      {
        path: '/eval/service',
        name: '学生服务岗位评审',
        component: () => import('@/views/evals/ServiceEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/competition',
        name: '竞赛得奖评审',
        component: () => import('@/views/evals/CompetitionEvalView'),
        meta: { title: 'Report', icon: 'el-icon-edit'}
      },
      {
        path: '/eval/practice',
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
