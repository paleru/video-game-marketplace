<script setup lang="ts">
import { directus } from '@/services/directus.service';
import { IonContent, IonLabel, IonIcon, IonRefresher, IonRefresherContent, IonList, IonChip, IonSelect, IonSelectOption, IonInput, IonTextarea, IonModal, IonItem, IonHeader, IonButton, IonButtons, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle, onIonViewDidEnter, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { IVideoGame, IVideoGamesResponse, INewVideoGame } from '@/models/VideoGameModels';
import { ref } from 'vue';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import VideoGameCardVue from '@/components/VideoGameCard.vue';

/* states for user input*/
const newVideoGame = ref<INewVideoGame>({
  title: "",
  description: "",
  platform: "",
  price: 0,
  condition: "",
  image: ""
});

const videoGames = ref<IVideoGame[]>([])

onIonViewDidEnter(() => {
  fetchVideoGames();
})

/* enables refreshing of page */
const refreshVideoGamesView = async (event: CustomEvent) => {
  await fetchVideoGames();
  event.target.complete();
}

/* Fetches videogames from directus, called both when entering page and refreshing */
const fetchVideoGames = async () => {
  const response = await directus.graphql.items<IVideoGamesResponse>(`
  query {
    video_games {
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

  /* check to see if http-request was successful*/
  if (response.status === 200 && response.data) {
    videoGames.value = [...response.data.video_games];
    console.log(videoGames.value)
  }
}


/* modal state */
const isModalOpen = ref(false);

/* function used to add new game to videoGames by taking in user input*/
const addNewGame = async () => {
  /* videoGames.value.unshift({
    id: 2,
    title: newVideoGame.value.title,
    description: newVideoGame.value.description,
    platform: newVideoGame.value.platform,
    price: newVideoGame.value.price,
    condition: newVideoGame.value.condition,
    imageURL: newVideoGame.value.image
  }) */

  if (!newVideoGame.value.title || !newVideoGame.value.description || !newVideoGame.value.platform || !newVideoGame.value.price || !newVideoGame.value.platform || !newVideoGame.value.image) {
    alert("Vennligst fyll inn all informasjon")
    return;
  }

  try {
    const response = await fetch(newVideoGame.value.image);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append('file', imageBlob);
    const fileUpload = await directus.files.createOne(formData);

    if (fileUpload) {
      await directus.items('video_games').createOne({
        title: newVideoGame.value.title,
        description: newVideoGame.value.description,
        platform: newVideoGame.value.platform,
        price: newVideoGame.value.price,
        condition: newVideoGame.value.condition,
        image: fileUpload.id
      })
    }

  } catch (error) {
    console.log(error);
  }

  /* close modal after adding game */
  isModalOpen.value = false;
}

const triggerCamera = async () => {
  const photo = await Camera.getPhoto({
    quality: 80,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });

  if (photo.webPath) {
    newVideoGame.value.image = photo.webPath;
  }

}

const removeImagePreview = () => {
  newVideoGame.value.image = '';
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title color="light">TDS200 Eksamen</ion-title>
        <ion-buttons slot="end">
          <ion-button type="button" @click="isModalOpen = true" color="tertiary" fill="solid">Legg ut spill</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="secondary">

      <ion-refresher slot="fixed" @ionRefresh="refreshVideoGamesView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <video-game-card-vue v-for="game in videoGames" :key="game.id" :game="game" />

      <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.55" :breakpoints="[0, 0.25, 0.55, 0.95]"
        @did-dismiss="isModalOpen = false">
        <ion-content>

          <ion-grid>
            <ion-row v-if="newVideoGame.image">
              <ion-col >
                <img :src="newVideoGame.image" />
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <ion-button @click="triggerCamera">
                  Velg bilde
                  <ion-icon slot="end" :icon="cameraOutline"></ion-icon>
                </ion-button>
                <ion-button v-if="newVideoGame.image" @click="removeImagePreview" fill="default"
                  class="remove-image-preview">
                  <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
                </ion-button>
              </ion-col>
            </ion-row>

          <ion-row>
            <ion-col>
              <ion-list>
                <ion-item>
                  <ion-label position="floating">Navn</ion-label>
                  <ion-input v-model="newVideoGame.title" type="text"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Beskriv spillet ditt</ion-label>
                  <ion-textarea :auto-grow="true" :maxlength="500" v-model="newVideoGame.description"></ion-textarea>
                </ion-item>
                <ion-item>
                  <ion-label>Pris</ion-label>
                  <ion-input type="number" v-model.number="newVideoGame.price" placeholder="0000"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-select placeholder="Velg plattform" v-model="newVideoGame.platform">
                    <ion-select-option value="Playstation">Playstation</ion-select-option>
                    <ion-select-option value="Nintendo">Nintendo</ion-select-option>
                    <ion-select-option value="Xbox">Xbox</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>

          <ion-row >
            <ion-col>
              <label>
                <input type="radio" v-model="newVideoGame.condition" value="New" />
                Nytt
              </label>
            </ion-col>
            <ion-col>
              <label>
                <input type="radio" v-model="newVideoGame.condition" value="Used" />
                Brukt
              </label>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-button @click="addNewGame">Legg ut ditt spill</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-col {
  text-align: center;
}
</style>
