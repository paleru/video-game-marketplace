<script setup lang="ts">
import { authService } from '@/services/directus.service';
import { IonPage, IonButton, IonInput, IonLabel, IonList, IonItem, IonContent, IonHeader, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const inRegisterMode = ref(false);

const userDetails = ref({
    userName: '',
    email: '',
    password: ''
});

const login = async () => {
    try {

        await authService.login(userDetails.value.email, userDetails.value.password);
        router.replace('/home');

    } catch (error) {
        console.error(error)
    }
}

const register = async () => {
    try {
        const wasRegistered = await authService.register(userDetails.value.userName, userDetails.value.email, userDetails.value.password)
        await login();
        /* if (wasRegistered) {
            await login();
        } */
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-segment value="login" @ion-change="inRegisterMode = !inRegisterMode">
                    <ion-segment-button value="login">
                        Login
                    </ion-segment-button>
                    <ion-segment-button value="signup">
                        Sign up
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>

        <img class="hero-image" src="assets/video-game-header.png" />

        <ion-content :fullscreen="true">
            
            <ion-list lines="none">

                <ion-item v-if="inRegisterMode">
                    <ion-label class="label-mild" position="floating">Fornavn</ion-label>
                    <ion-input v-model="userDetails.userName" type="text"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Email</ion-label>
                    <ion-input type="email" v-model="userDetails.email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Passord</ion-label>
                    <ion-input type="password" v-model="userDetails.password" ></ion-input>
                </ion-item>

                <ion-button v-if="inRegisterMode" @click="register" class="button-auth" fill="solid" color="dark" size="default">
                    Registrer deg
                </ion-button>

                <ion-button v-else @click="login" class="button-auth" fill="solid" color="dark" size="default">
                    Logg inn
                </ion-button>

            </ion-list>
                
        </ion-content>

    </ion-page>


</template>

<style scoped>

ion-content {
    --ion-background-color: #f4f4f4;
    display: flex;
}

ion-list {
    display: flex;
    flex-direction: column;
}

.label-mild {
    --color: #8a8a8a !important;
}

.hero-image {
    width: 80vw;
    align-self: center;
}

.button-auth {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>