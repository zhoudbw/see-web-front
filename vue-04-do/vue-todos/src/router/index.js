// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import AppLayouts from '@/components/AppLayouts.vue'

const routes = [
    {
        path: '/',
        name: 'Layouts',
        component: AppLayouts
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router