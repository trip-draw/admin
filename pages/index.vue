<template>
  <div class="d-flex align-center flex-column">
    <v-icon large color="green darken-2">mdi-domain</v-icon>
    <v-btn
      color="primary"
      elevation="2"
      @click="v"
      outlined
      rounded
    >Click</v-btn>
  </div>
</template>

<script setup="ts">
import { usePostStore } from '~/stores/post';

const postStore = usePostStore();
const v = async () => {
  const error = await postStore.search();
};
</script>