<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip} from '@ionic/vue'
import VideoGameImage from './VideoGameImage.vue'

defineProps(["game"]);

</script>

<template>
    <ion-card color="light">

        <ion-card-header :router-link="'/game/' + game.id" >
            <video-game-image :image-id="game.image.id" />
            <ion-card-subtitle>{{ game.price }},-</ion-card-subtitle>
            <ion-card-title>{{ game.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content :router-link="'/game/' + game.id" >
            {{ game.description }}
        </ion-card-content>

        <ion-chip :router-link="'/condition/' + game.condition">{{ game.condition }}</ion-chip>
        <ion-chip :router-link="'/platform/' + game.platform">{{ game.platform }}</ion-chip>

    </ion-card>
</template>

<style>
  ion-chip {
    --background: #000;
    --color: #ffFF;
    margin: 2px 5px 10px 15px; 
  }
</style>