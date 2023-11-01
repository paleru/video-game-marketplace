<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip} from '@ionic/vue'
import VideoGameImage from './VideoGameImage.vue'

defineProps(["game"]);

</script>

<template>
    <ion-card :router-link="'/game/' + game.id" color="light">

        <ion-card-header>
            <video-game-image :image-id="game.image.id" />
            <ion-card-subtitle>{{ game.price }},-</ion-card-subtitle>
            <ion-card-title>{{ game.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            {{ game.description }}
        </ion-card-content>

        <ion-chip >{{ game.condition }}</ion-chip>
        <ion-chip >{{ game.platform }}</ion-chip>

    </ion-card>
</template>

<style>
  ion-chip {
    --background: #000;
    --color: #ffFF;
    margin: 2px 5px 10px 15px; 
  }
</style>