<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import Card from 'primevue/card';
import usuarioService from "@/services/auth.service.js";
import {Form} from '@primevue/forms';
import Button from 'primevue/button';


const router = useRouter();


const UserProfile = ref([]);
onMounted(() => {
    ProfileUser();
})

async function ProfileUser() {
    try {
        const {data} = await usuarioService.profile();
        // console.log(data);
        UserProfile.value = data;
        // console.log(UserProfile.value.name);
    } catch (err) {
        alert(err.response.data.errors);
    }
}
</script>

<template>
    <div class="flex flex-col md:flex-row">
        <Card class="w-full md:w-1/3 p-4 m-4 mb-4 flex flex-col items-center justify-center">
            <template #title>
                <div class="text-center text-2xl dark:text-surface-0">
                    PERFIL
                </div>
            </template>
            <template #content>
                <div class="justify-center text-center mt-5">
                    <Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle"
                            size="xlarge"></Avatar>
                    <div class="mt-10 text-center">
                        <ButtonGroup>
                            <!--                                <Button label="Editar" icon="pi pi-pencil" severity="success"/>-->
                            <Button label="Guardar" icon="pi pi-check" severity="success"/>
                            <Button label="Cancelar" icon="pi pi-times" severity="danger"/>
                        </ButtonGroup>
                    </div>
                </div>
            </template>
        </Card>
        <Card class="w-full md:w-3/4 p-4 m-4 mb-4">
            <template #title>INFORMACION PERSONAL</template>
            <template #content>
                <div class=" w-full grid grid-cols-1 gap-4">
                    <Form @submit="updateProfile()">
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Correo</label>
                        <InputText v-model="UserProfile.email" placeholder="Correo" id="email1" class="w-full mb-5"/>
                        <label for="name" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Nombre</label>
                        <InputText v-model="UserProfile.name" placeholder="Nombre" id="name1" class="w-full mb-5"/>
                        <div class="flex justify-end me-4 mt-3">
                            <ButtonGroup>
                                <Button label="Actualizar" icon="pi pi-check" severity="success"/>
                                <Button label="Cancelar" icon="pi pi-times" severity="danger"/>
                            </ButtonGroup>
                        </div>
                    </Form>
                </div>
            </template>
        </Card>
    
    </div>


</template>


<style scoped>

</style>