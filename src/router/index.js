import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/layout'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
        name: 'home'
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
      },
      // yudingyi
      {
        path: "/science_admin",
        name: "science_admin",
        component: () =>
            import(/* webpackChunkName: "sciAdmin" */ "@/views/ScienceAdminView.vue"),
      },
      {
        path: "/student_manage",
        name: "student_manage",
        component: () =>
            import(/* webpackChunkName: "stuManage" */ "@/views/StudentManage.vue"),
      },
      // wanglingyu
      {
        path: "/gpa",
        name: "gpa",
        component: () =>
          import(/* webpackChunkName: "gpa" */ "@/views/GpaView.vue"),
      },
      {
        path: "/gpa-eval",
        name: "gpa-eval",
        component: () =>
          import(/* webpackChunkName: "gpa-eval" */ "@/views/GpaEvalView.vue"),
      },
      {
        path: "/stu-import",
        name: "stu-import",
        component: () =>
          import(/* webpackChunkName: "stu-import" */ "@/views/ImportStuView.vue"),
      },
      // wuqile
      {
        path: "/competition_admin",
        name: "competition",
        component: () =>
          import(/* webpackChunkName: "competition_admin" */ "@/views/competition_admin.vue"),
      },
      {
        path: "/student_service",
        name: "student_service",
        component: () =>
          import(/* webpackChunkName: "student_service" */ "@/views/student_service.vue"),
      },
      // wangdy
      {
        path: "/summary",
        name: "summary",
        component: () =>
          import(/* webpackChunkName: "summary" */ "@/views/SummaryView.vue"),
      },
      {
        path: "/personalSum",
        name: "personalSum",
        component: () =>
          import(/* webpackChunkName: "personalSum" */ "@/views/PersonalSumView.vue"),
      },
      // mxh
      {
        path: "/social_practice",
        name: "social_practice",
        component: () =>
          import(/* webpackChunkName: "social_practice" */ "@/views/social_practice.vue"),
      },
      {
        path: "/Volunteer_service",
        name: "Volunteer_service",
        component: () =>
          import(/* webpackChunkName: "Volunteer_service" */ "@/views/Volunteer_service.vue"),
      },
      // 学生在线填报
      {
        path: "/report",
        name: "report",
        component: () =>
          import(/* webpackChunkName: "report" */ "@/views/ReportView.vue"),
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
