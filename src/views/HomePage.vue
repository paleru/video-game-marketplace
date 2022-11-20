<script setup lang="ts">
import { directus } from '@/services/directus.service';
import { IonContent, IonLabel, IonIcon, IonList, IonChip, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonInput, IonTextarea, IonModal, IonItem, IonHeader, IonButton, IonButtons, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle, onIonViewDidEnter } from '@ionic/vue';
import { ref } from 'vue';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';

const userAccessToken = localStorage.getItem('auth_token');

/* states for user input*/
const newVideoGame = ref({
  title: "",
  description: "",
  platform: "",
  price: 0,
  condition: "",
  image: ""
});

/* array for videogames, incl. dummy data */
const videoGames = ref([])

onIonViewDidEnter(async () => {
  const response = await directus.graphql.items(`
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
      user_created {
        first_name
      }
    }
  }
  `);

  /* check to see if http-request was successful*/
  if (response.status === 200 && response.data) {
    videoGames.value = [...response.data.video_games];
    console.log(videoGames.value)
  }
})

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

  if (!newVideoGame.value.title || !newVideoGame.value.description || !newVideoGame.value.platform || !newVideoGame.value.price || !newVideoGame.value.platform ||!newVideoGame.value.image) {
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
        platform: newVideoGame.value.platform ,
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
      <ion-toolbar>
        <ion-title color="dark">TDS200 Eksamen</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="isModalOpen = true" color="dark">Post</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
 
      <ion-card v-for="game in videoGames" :key="game.id" :router-link="'/game/' + game.id">

        <ion-card-header>
          <img :src="`https://n8mifr5t.directus.app/assets/${game.image.id}?access_token=${userAccessToken}`" />
          <ion-card-subtitle>{{ game.price }},-</ion-card-subtitle>
          <ion-card-title>{{ game.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-card-title>{{ game.description }}</ion-card-title>
          <ion-chip>{{ game.condition }}</ion-chip>
          <ion-chip>{{ game.platform }}</ion-chip>
        </ion-card-content>

      </ion-card>

      <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.55" :breakpoints="[0, 0.25, 0.55, 0.95]"
        @did-dismiss="isModalOpen = false">
        <ion-content>
          <ion-list>

            <section v-if="newVideoGame.image">
              <ion-button @click="removeImagePreview" fill="default" class="remove-image-preview">
                <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
              </ion-button>
              <img :src="newVideoGame.image" />
            </section>

            <ion-button @click="triggerCamera">
              Velg bilde
              <ion-icon slot="end" :icon="cameraOutline"></ion-icon>
            </ion-button>

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
            <ion-item>
              <label>
                <input type="radio" v-model="newVideoGame.condition" value="New" />
                Nytt
              </label>
              <label>
                <input type="radio" v-model="newVideoGame.condition" value="Used" />
                Brukt
              </label>
            </ion-item>
          </ion-list>
          <ion-item lines="none">
            <ion-button @click="addNewGame">Legg ut ditt spill</ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>
