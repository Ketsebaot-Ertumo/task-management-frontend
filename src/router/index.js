import CreateTask from '@/views/task/CreateTask.vue'
import Dashboard from '@/views/task/Dashboard.vue'
import TaskDetail from '@/views/task/TaskDetail.vue'
import UpdateTask from '@/views/task/UpdateTask.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    // path: '/task',
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    props: true,
  },
  {
    path: '/task/create',
    name: 'CreateTask',
    component: CreateTask,
  },
  {
    path: '/task/edit/:id',
    name: 'UpdateTask',
    component: UpdateTask,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
})

export default router