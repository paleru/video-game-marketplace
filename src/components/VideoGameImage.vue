<script setup lang="ts">

const userAccessToken = localStorage.getItem('auth_token');
defineProps(["imageId"]);

</script>

<template>
    <img :src="`https://video-game-marketplace.directus.app/assets/${imageId}?access_token=${userAccessToken}`" />
</template>