<template>
  <div class="d-flex align-center flex-column">
    <br />
    <v-row>
      <v-col>
        <v-card variant="outlined" class="mx-auto" min-width="360" color="success">
          <v-card-title>
            <v-icon class="me-3" icon="mdi-account-group-outline"></v-icon>
            사용자
          </v-card-title>
          <br />
          <v-card-text><h1> {{ statStore.item.memberCount }}</h1></v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card variant="outlined"  class="mx-auto" min-width="360" color="info">
          <v-card-title>
            <v-icon class="me-3" icon="mdi-run"></v-icon>
            총 여행 수
          </v-card-title>
          <br />
          <v-card-text><h1>{{ statStore.item.tripCount }}</h1></v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card variant="outlined" class="mx-auto" min-width="360" color="warning">
          <v-card-title>
            <v-icon class="me-3" icon="mdi-map-marker-outline"></v-icon>
            위치 정보 수
          </v-card-title>
          <br />
          <v-card-text><h1>{{ statStore.item.pointCount }}</h1></v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card variant="outlined"  class="mx-auto" min-width="360" color="primary">
          <v-card-title>
            <v-icon class="me-3" icon="mdi-note-edit-outline"></v-icon>
            총 감상 수
          </v-card-title>
          <br />
          <v-card-text><h1>{{ statStore.item.postCount }}</h1></v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <br>
  </div>
</template>

<script setup="ts">
import { useStatStore } from "~/stores/stat";

const statStore = useStatStore();
await statStore.search();
</script>
