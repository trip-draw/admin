<template>
  <div>
    <v-container align="center">
      <v-card align="left" max-width="480px">
        <v-card-item>
          <h3>
            <v-icon class="me-2" icon="mdi-account-outline"></v-icon>이메일을 입력해주세요.
          </h3>
          <br />
          <v-text-field
            v-model="authStore.email"
            hide-details
            variant="outlined"
            @click:append-inner="login"
            @keypress.enter="login"
          ></v-text-field>
          <br />
          <h3>
            <v-icon class="me-2" icon="mdi-account-outline"></v-icon>비밀번호를 입력해주세요.
          </h3>
          <br />
          <v-text-field
            type="password"
            v-model="authStore.password"
            hide-details
            variant="outlined"
            @click:append-inner="login"
            @keypress.enter="login"
          ></v-text-field>
        </v-card-item>
        <v-card-item align="right">
            <v-btn variant="outlined" prepend-icon="mdi-login-variant" color="success" @click="login"
              ><h2>완료</h2></v-btn
            >
        </v-card-item>
        <v-divider></v-divider>
      </v-card>
      <v-snackbar v-model="loginAlert" location="bottom" color="white"
        >로그인에 실패했습니다. 
        <template v-slot:actions>
          <v-btn color="error" @click="loginAlert = false"> 닫기 </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
const loginAlert = ref(false);

const login = async () => {
  const error = await authStore.login();

  if (error?.value) {
    loginAlert.value = true;
    return;
  }
  navigateTo("/");
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", Arial, Verdana, Tahoma, sans-serif;
}
</style>
