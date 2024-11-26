import {createWebHistory, createRouter} from 'vue-router'
import Inicio from '../views/web/Inicio.vue'
import Servicios from "../views/web/Servicios.vue";
import Login from "../views/auth/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Inicio},
        {
            path: '/servicios',
            component: Servicios},
        {
            path: '/login',
            component: Login,
        }
    ]
})
export default router;