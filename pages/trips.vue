<template>
  <div>
    <v-container>
      <h2 class="likeText">여행 관리</h2>
      <v-row>
        <v-col
          v-for="trip in tripStore.items.items"
          cols="12"
          sm="4"
          lg="4"
          xl="3"
          xxl="2"
          :key="trip.name"
        >
          <v-card class="mx-auto" max-width="344">
            <v-img :src="trip.imageUrl" height="200px" cover></v-img>

            <v-card-title>여행 제목: {{ trip.name }}</v-card-title>
            <v-chip
              size="small"
              class="ma-2"
              color="success"
              text-color="white"
              prepend-icon="mdi-account-outline"
              variant="outlined"
              v-if="trip.status == 'ONGOING'"
              label
            >
              ONGOING
            </v-chip>

            <v-chip
              size="small"
              color="warning"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-run"
              variant="outlined"
              v-if="trip.status == 'FINISHED'"
              label
            >
              FINISHED
            </v-chip>
            <v-chip
              size="small"
              class="ma-2"
              text-color="white"
              prepend-icon="mdi-map-marker-outline"
              variant="outlined"
              label
            >
              위치 정보 수: {{ trip.route.length }}
            </v-chip>

            <br />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="outlined"
                @click="showRemoveAlert(trip.tripId)"
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
import { useTripStore } from "~/stores/trip";

const isIntersect = ref(false);
const removeId = ref(0);
const removeAlert = ref(false);
const tripStore = useTripStore();

const searchNext = async () => {
  if (isIntersect.value) {
    return;
  }
  isIntersect.value = true;
  await tripStore.search();
  isIntersect.value = false;
};

const clearAndSearch = async () => {
  await tripStore.clear();
  await tripStore.search();
};

const showRemoveAlert = async (id: any) => {
  removeId.value = id;
  removeAlert.value = true;
};

const remove = async () => {
  await tripStore.remove(removeId.value);
  console.log(removeId.value);
  removeAlert.value = false;
};

clearAndSearch();
</script>

<style scoped>
.noto {
  font-family: "Noto Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
