<script setup>
import {onMounted, ref} from "vue";
import usuarioService from "../../../services/usuario.service.js";



// Declarar variables
const users = ref([]);
const user = ref({name: "", email: "", password: ""});
const errors = ref({});

// ciclo de vida
onMounted(() => {
    getUsers()
})

// funciones metodo

/* Muestra los datos */
async function getUsers() {
    try {
        const {data} = await usuarioService.index();
        users.value = data;
    } catch (e) {
        if(e.response.data.status === 404){
            alert("La pagina no existe")
        }
    }
}

async function saveUser() {
    try {
        if (user.value.id) {
            await usuarioService.update(user.value.id, user.value);
        } else {
            await usuarioService.store(user.value);
        }
    } catch (err) {
        errors.value = err.response.data.errors;
    }
    await getUsers();
}

async function funUpdate(usuario) {
    user.value = usuario;
}

async function funDelete(userId) {
    if (confirm("¿Esta seguro de eliminar este usuario?")) {
        await usuarioService.destroy(userId);
    }
    await getUsers();
}

function cancelarRegister() {
    user.value = {name: "", email: "", password: ""};
    errors.value = {};
}
</script>

<template>
    <h1>Usuario</h1>
    {{ user }}
    <div>
        <label for="n">Nombre: </label>
        <input type="text" id="n" v-model="user.name">
        {{ errors.name }}
        <br>
        <label for="e">Email: </label>
        <input type="email" id="e" v-model="user.email">
        {{ errors.email }}
        <br>
        <label for="p">Contraseña: </label>
        <input type="password" id="p" v-model="user.password">
        {{ errors.password }}
        <br>
        <button @click="saveUser">{{ user.id ? 'Modificar' : 'Guardar' }}</button>
        <button @click="cancelarRegister">Cancelar</button>
    </div>
    
    <table border=1>
        <thead>
        <tr>
            <td>ID</td>
            <td>NOMBRE</td>
            <td>EMAIL</td>
            <td>CREADO EN</td>
            <td>ACCION</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at }}</td>
            <td>
                <button @click="funUpdate(user)">EDITAR</button>
                <button @click="funDelete(user.id)">ELIMINAR</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>