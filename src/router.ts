import {
    createRouter, createWebHistory, Router
} from 'vue-router'
import {useStore} from "vuex";
import store from "./store/index";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import("./pages/login/Login.vue"),
        },
        {
            path: '/',
            name: 'Dashboard',
            component: () => import("./pages/dashboard/Dashboard.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/item/:id',
            name: 'ItemView',
            component: () => import("./pages/dashboard/Dashboard.vue"),
            meta: {
                requiresAuth: true
            }
        },
    ]
})


router.beforeEach((to, from, next) => {

    const isLogged = store.state.auth.logged

    if (to.matched.some(record => record.meta.requiresAuth) && !isLogged) {
        next('/login')
    }

    next()
})

export default router
