<script setup lang="ts">
import { IonModal, IonItem, IonTextarea, IonSpinner, IonChip, IonContent, IonHeader, IonListHeader, IonLabel, IonIcon, IonBadge, IonList, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, onIonViewDidEnter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

/* routes */
const route = useRoute();
const { id } = route.params;

const videoGame = ref({
    id: 1,
    title: "Disco Elysium",
    description: "You're an alcoholic detective trying to solve a murder mystery while regaining your lost memories.",
    platform: "PS4",
    price: 499,
    condition: "New",
    imageURL: "https://cdn1.epicgames.com/ff52981b1d9947978153c7a7f8bc6d90/offer/EGS_DiscoElysiumTheFinalCut_ZAUM_S6-1200x1600-486d4da970eede7364b9650d63900bad.jpg",
    location: {
        latitude: 59.888033,
        longitude: 10.862266
    }
})

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title color="dark">{{ videoGame.title }}</ion-title>
                <ion-buttons slot="end">
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <img :alt="videoGame.title" :src="videoGame.imageURL" />

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>Description</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    {{ videoGame.description }}
                    <ion-card-subtitle>{{ videoGame.price }},-</ion-card-subtitle>
                </ion-card-content>
                <ion-chip>{{ videoGame.condition }}</ion-chip>
                <ion-chip>{{ videoGame.platform }}</ion-chip>
            </ion-card>

        </ion-content>

    </ion-page>
</template>