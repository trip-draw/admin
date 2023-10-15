<template>
  <div>
    <Head>
      <Title>tripdraw</Title>
    </Head>
    <v-layout>
      <v-app-bar flat class="noto">
        <v-btn @click="navigateTo('/')"><h2>트립드로우</h2></v-btn>
        <v-btn @click="navigateTo('/trips')">여행 관리</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="toggleTheme" :icon="commentStore.icon"></v-btn>
        <v-btn variant="text" icon="mdi-account-outline">
          <v-icon>mdi-account-outline</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="navigateTo('/login')">
                <v-list-item-title>
                  <v-icon icon="mdi-account-edit-outline"></v-icon>
                  정보 수정
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-divider></v-divider>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify";
import { useCommonStore } from "~/stores/common";

const commentStore = useCommonStore();
const theme = useTheme();
theme.global.name.value = commentStore.theme;

const toggleTheme = () => {
  commentStore.toggle();
  theme.global.name.value = commentStore.theme;
};
</script>

<style scoped>
.noto {
  font-family: "Noto Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
