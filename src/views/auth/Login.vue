<script setup>
// import axios from "axios"
import authService from "../../services/auth.service.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const usuario = ref({email: "", password: ""})
const erros = ref({})

async function funIngresar(){
    try{
        const {data} =await authService.login(usuario.value)
        console.log(data)
        localStorage.setItem("access_token", data.access_token);
        await router.push("/services");
    }catch(err){
        if(err.response.data.errors){
            erros.value = err.response.data.errors;
        }else{
            alert(err.response.data.message)
        }
    }
}
</script>

<template>
    <pre>{{ usuario }}</pre>
    <h1>Login</h1>
    <form @submit.prevent="funIngresar()">
        <label for="email">INGRESE SU CORREO</label>
        <input type="email" id="email" required v-model="usuario.email">
        {{erros.email}}
        <br>
        <label for="password">INGRESE SU CONTRASEÑA</label>
        <input type="password" id="password" required v-model="usuario.password">
        {{erros.password}}
        <br>
        <input type="submit" value="Ingresar">
        <input type="" value="Olvidaste tu contraseña">
    </form>
</template>

<style scoped>

</style>