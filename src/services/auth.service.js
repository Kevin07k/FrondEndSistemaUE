import {Api} from './apiService';

export default {
    login: (credencial) => {
        return Api().post("/login", credencial)
            /*.then(response => response)
            .catch(error => {
                    // Manejo del error de login
                    // console.error("Error en login:", error.response ? error.response.data : error.message);
                    throw error;  // Propaga el error para manejarlo externamente si es necesario
                }
            );*/
    },
    register: (datos) => {
        return Api().post("/register", datos)
            .then(response => response)
            .catch(error => {
                // Manejo del error de registro
                console.error("Error en registro:", error.response ? error.response.data : error.message);
                throw error;
            });
    },
    profile: () => {
        return Api().get("/profile")
            .then(response => response)
            .catch(error => {
                // Manejo del error al obtener el perfil
                console.error("Error al obtener el perfil:", error.response ? error.response.data : error.message);
                throw error;
            });
    },
    logout: () => {
        return Api().post("/logout")
            .then(response => response)
            .catch(error => {
                // Manejo del error de logout
                console.error("Error en logout:", error.response ? error.response.data : error.message);
                throw error;
            });
    }
}