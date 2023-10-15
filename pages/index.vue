<template>
  <div class="d-flex align-center flex-column">
    <h1>오늘도 힘내자</h1>
  </div>
</template>

<script setup="ts">
import { usePostStore } from "~/stores/post";

const postStore = usePostStore();
const v = async () => {
  const error = await postStore.search();
};
</script>
