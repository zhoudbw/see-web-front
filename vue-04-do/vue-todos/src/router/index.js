/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import AppLayouts from '@/components/AppLayouts.vue'
import AppTodo from "@/components/AppTodo.vue";

const routes = [
    {
        // 访问根目录时,渲染布局
        path: '/',
        name: 'layout',
        component: AppLayouts
    },
    {
        // 访问具体待办标题时,渲染_Todo
        path: '/todo',
        children: [
            {
                path: ':id',
                name: 'todo',
                component: AppTodo
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router