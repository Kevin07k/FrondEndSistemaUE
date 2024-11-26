import {Api} from './apiService';

export default {
    login: (credencial) => {
        return Api().post("/v1/auth/login", credencial);
    },
    register: (datos) => {
        return Api().post("/v1/auth/register", datos);
    },
    profile: ()=>{
        return Api().get("/v1/auth/profile");
    },
    logout: () => {
        return Api().post("/v1/auth/logout");
    }
}