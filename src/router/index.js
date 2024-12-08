import {createWebHistory, createRouter} from 'vue-router'
import Inicio from '../views/web/Inicio.vue'
import Servicios from "../views/web/Servicios.vue";
import Login from "../views/auth/Login.vue";
import User from "../views/admin/User/User.vue";
import Profile from "../views/admin/Profile/Profile.vue";
import NotFound from "../views/errors/NotFound.vue";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Inicio
        },
        {
            path: '/servicios',
            component: Servicios
        },
        {
            path: '/login',
            component: Login,
            name: 'Login',
            meta: { redirectIfAuthenticated: true }
        },
        {
            path: '/admin',
            component: AppLayout,
            children: [
                {
                    path: '/perfil',
                    component: Profile,
                    name: 'Perfil',
                    meta:{
                        requireAuth: true,
                    }
                },
                {
                    path: '/usuario',
                    component: User,
                    name: 'Usuario',
                    meta: { requireAuth: true }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
        }
        ]
})

// Guards

router.beforeEach((to, from, next)=>{
    let token = localStorage.getItem('access_token');
    /* Pregunta si esta logueado para entrar a las paginas protegidas */
    if(to.meta.requireAuth){
        if(!token) {
            return next({name: 'Login'});
        }
        return next();
    }

    if (to.meta.redirectIfAuthenticated && token) {
        return next({name : 'Usuario'});
    }else {
        return next();
    }
})
export default router;