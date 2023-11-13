<script setup lang="ts">
import { IonButton, IonIcon, IonContent, IonHeader, IonLabel, IonItem, IonAvatar, IonPage, IonSpinner, IonTitle, IonToolbar, IonBackButton, IonButtons, onIonViewDidEnter, IonRow, IonCol, IonGrid, toastController } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { IVideoGame, IVideoGameResponse } from '@/models/VideoGameModels';
import { ref } from 'vue';
import { directus } from '@/services/directus.service'
import { authService } from '@/services/directus.service';
import VideoGameImageVue from '@/components/VideoGameImage.vue';
import moment from 'moment';
import { trashOutline } from 'ionicons/icons';

/* routes */

const router = useRouter();
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
          first_name,
          email
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

// Let's logged in user delete own game listing
const deleteGame = async (gameId: number) => {
  try {
    // Use the Directus SDK to delete the item by its ID
    await directus.items('video_games').deleteOne(gameId);

    // Update the local state (videoGame) to reflect the deletion
    videoGame.value = null;

    const deletedToast = await toastController.create({
      message: "Your game listing was deleted",
      duration: 3000,
      color: "success"
    });

    await deletedToast.present();
    router.replace('/home');
  } catch (error) {
    console.error('Error deleting game:', error);
  }
};


const user = ref(null); // Initialize user ref

// Fetch user information when the page loads
onIonViewDidEnter(async () => {
  user.value = await authService.currentUser();
});

/* converts publish date from ISO to local time */
const formatDate = (isoDate: string | null) => {
  if (isoDate) {
    const localTime = moment(isoDate).utcOffset(60); // UTC offset for GMT+1
    return localTime.format('DD-MM-YY');
  }
  return '';
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
        <ion-title v-if="videoGame">{{ videoGame.title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="videoGame && !isLoading" color="secondary">
      <video-game-image-vue :image-id="videoGame.image.id" />
      <ion-item lines="full" color="secondary">
        <ion-avatar slot="start">
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </ion-avatar>
        <ion-label>{{ videoGame.user_created.first_name }}</ion-label>
        <ion-button 
        fill="default" 
        class="remove-image-preview" 
        slot="end" 
        v-if="user && videoGame && user.email === videoGame.user_created.email"
        @click="deleteGame(videoGame.id)">
          <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
        </ion-button>
      </ion-item>
      <section class="ion-padding">
        <p>
          {{ videoGame.description }}
        </p>
      </section>

      <ion-grid>
        <ion-row></ion-row>
        <ion-row>
          <ion-col>
            {{ videoGame.platform }}
          </ion-col>
          <ion-col>
            {{ videoGame.condition }}
          </ion-col>
          <ion-col>
            {{ videoGame.price }},-
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Published {{ formatDate(videoGame.date_created) }}
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>

  </ion-page>
</template>

<style scoped>
ion-col {
  background-color: #000;
  border: solid 2px #fff;
  border-radius: 15px;
  text-align: center;
  color: #fff;
}

ion-avatar {
  --border-radius: 4px;
}
</style>