<script setup lang="ts">
import { IonChip, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardSubtitle, IonCardHeader, IonCardContent, onIonViewDidEnter} from '@ionic/vue';
import { useRoute } from 'vue-router'; 
import { IVideoGame, IVideoGameResponse } from '@/models/VideoGameModels';
import { ref } from 'vue';
import { directus } from '@/services/directus.service'
import VideoGameImageVue from '@/components/VideoGameImage.vue';

/* routes */
const route = useRoute(); 
const { id } = route.params; 

const isLoading = ref(true);

const videoGame = ref<IVideoGame | null>(null)

onIonViewDidEnter(() => {
    fetchVideoGame();
})

const fetchVideoGame = async () => {
  const response = await directus.graphql.items<IVideoGameResponse>(`
    query {
      video_games_by_id(id: ${id}) {
        id,
        title,
        description,
        platform,
        price,
        condition,
        image {
          id
        },
        user_created {
          first_name
        },
        date_created
      }
    }
  `);

  if (response.status === 200 && response.data) {
    videoGame.value = response.data.video_games_by_id;
    isLoading.value = false;
  }

}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="isLoading">
                    <ion-spinner></ion-spinner>
                </ion-title>
                <ion-title v-if="videoGame" color="dark">{{ videoGame.title }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" v-if="videoGame && !isLoading">
            <video-game-image-vue :image-id="videoGame.image.id" />

            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>{{ videoGame.date_created }}</ion-card-subtitle>
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