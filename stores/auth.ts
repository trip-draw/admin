import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const email = ref("");
    const password = ref("");

    const login = async () => {
      const { data, error } = await useFetch(
        useRuntimeConfig().public.baseUrl + "/admin/login",
        {
          credentials: 'include',
          body: {
            email: email.value,
            password: password.value
          },
          method: "POST",
        }
      );
      return error;
    };

    return { email, password, login };
  },
  { persist: true }
);
