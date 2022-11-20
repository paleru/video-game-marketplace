<script setup lang="ts">
import { IonContent, IonLabel, IonChip, IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonInput, IonTextarea, IonModal, IonItem, IonHeader, IonButton, IonButtons, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { ref } from 'vue';

/* states */
const newVideoGame = ref({
  title: "",
  description: "",
  platform: "",
  price: 0,
  condition: "",
});

const isModalOpen = ref(false);

const videoGames = ref([
  {
    id: 1,
    title: "Disco Elysium",
    description: "You're an alcoholic detective trying to solve a murder mystery while regaining your lost memories.",
    platform: "PS4",
    price: 499,
    condition: "New",
    imageURL: "https://cdn1.epicgames.com/ff52981b1d9947978153c7a7f8bc6d90/offer/EGS_DiscoElysiumTheFinalCut_ZAUM_S6-1200x1600-486d4da970eede7364b9650d63900bad.jpg"
  }
])

const addNewGame = () => {
  videoGames.value.unshift({
    id: 2,
    title: newVideoGame.value.title,
    description: newVideoGame.value.description,
    platform: newVideoGame.value.platform,
    price: newVideoGame.value.price,
    condition: newVideoGame.value.condition,
    imageURL: "https://cdn1.epicgames.com/ff52981b1d9947978153c7a7f8bc6d90/offer/EGS_DiscoElysiumTheFinalCut_ZAUM_S6-1200x1600-486d4da970eede7364b9650d63900bad.jpg"

  })

  isModalOpen.value = false;
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
          <img :src="game.imageURL" />
          <ion-card-subtitle>{{ game.price }},-</ion-card-subtitle>
          <ion-card-title>{{ game.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-card-title>{{ game.description }}</ion-card-title>
          <ion-chip>{{ game.condition }}</ion-chip>
          <ion-chip>{{ game.platform }}</ion-chip>
        </ion-card-content>

      </ion-card>

      <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.55" :breakpoints="[0, 0.25, 0.55, 0.75]"
        @did-dismiss="isModalOpen = false">
        <ion-content>
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
