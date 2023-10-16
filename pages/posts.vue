<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="post in postStore.items"
          cols="12"
          sm="4"
          lg="4"
          xl="3"
          xxl="2"
          :key="post.title"
        >
          <v-card class="mx-auto" max-width="360">
            <v-img :src="post.postImageUrl" height="200px" cover></v-img>

            <v-card-title>감상 제목: {{ post.title }}</v-card-title>
            <v-chip
              size="small"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-map-marker-outline"
              variant="outlined"
              label
            >
              {{ post.address }}
            </v-chip>
            <v-chip
              size="small"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-clock-time-four-outline"
              variant="outlined"
              label
            >
              {{ parseDateTimeFormat(post.pointResponse.recordedAt) }}
            </v-chip>
            <br />
            <v-card-text>{{ post.writing }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="outlined"
                @click="showRemoveAlert(post.postId)"
              >
                삭제
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        color="white"
        v-model="removeAlert"
        vertical
        location="center"
      >
        <div class="text-subtitle-1 pb-2">삭제하시겠습니까?</div>
        <template v-slot:actions>
          <v-btn
            variant="outlined"
            color="error"
            prepend-icon="mdi-content-copy"
            @click="remove"
            >삭제</v-btn
          >
          &nbsp;
          <v-btn
            variant="outlined"
            color="green"
            prepend-icon="mdi-close"
            @click="removeAlert = false"
          >
            취소
          </v-btn>
        </template>
      </v-snackbar>
      <v-card v-intersect="searchNext"></v-card>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { usePostStore } from "~/stores/post";
import { parseDateTimeFormat } from "~/util/date";

const isIntersect = ref(false);
const removeId = ref(0);
const removeAlert = ref(false);
const postStore = usePostStore();

const searchNext = async () => {
  if (isIntersect.value) {
    return;
  }
  isIntersect.value = true;
  await postStore.search();
  isIntersect.value = false;
};

const clearAndSearch = async () => {
  await postStore.clear();
  await postStore.search();
};

const showRemoveAlert = async (id: any) => {
  removeId.value = id;
  removeAlert.value = true;
};

const remove = async () => {
  await postStore.remove(removeId.value);
  removeAlert.value = false;
};

clearAndSearch();
</script>

<style scoped>
.noto {
  font-family: "Noto Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
