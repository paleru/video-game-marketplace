<script setup lang="ts">
import { IonContent, IonRefresher, IonIcon, IonTitle, IonButtons, IonButton, IonRefresherContent, IonHeader, IonToolbar, IonPage, onIonViewDidEnter } from '@ionic/vue';
import { home } from 'ionicons/icons'
import { IVideoGame, IVideoGamesResponse } from '@/models/VideoGameModels';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import VideoGameCardVue from '@/components/VideoGameCard.vue';
import { directus } from '@/services/directus.service';

const route = useRoute();
const { filter } = route.params; // "platform" or "condition"
const { value } = route.params; // The value to filter by

const videoGames = ref<IVideoGame[]>([]);

onIonViewDidEnter(() => {
  fetchFilteredGames();
});

const refreshGamesView = async (event: CustomEvent) => {
  await fetchFilteredGames();
  event.target.complete();
};

const fetchFilteredGames = async () => {
  const response = await directus.graphql.items<IVideoGamesResponse>(`
    query {
      video_games(filter: { ${filter}: { _eq: "${value}" } }) {
        id,
        title,
        description,
        platform,
        price,
        condition,
        image {
          id
        },
      }
    }
  `);

  if (response.status === 200 && response.data) {
    videoGames.value = [...response.data.video_games];
  }
};
</script>

<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button type="button" :router-link="'/'">
                <ion-icon slot="icon-only" :icon="home" ></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title size="large">{{ filter }}: {{ value }}</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" color="secondary">
        <ion-refresher slot="fixed" @ionRefresh="refreshGamesView($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
  
        <video-game-card-vue v-for="game in videoGames" :key="game.id" :game="game" />
      </ion-content>
    </ion-page>
  </template>

<style scoped>
ion-col {
    text-align: center;
}
</style>