// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import AppLayouts from '@/components/AppLayouts.vue'
import AppTodo from "@/components/AppTodo.vue";

const routes = [
    {
        path: '/',
        name: 'Layouts',
        component: AppLayouts,
        children: [{
            path: '/todo/:id',
            name: 'todo',
            component: AppTodo
        }]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router