import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const email = ref("");
    const password = ref("");

    const login = async () => {
      const { data, error } = await useFetch(
        "/api/admin/login",
        {
          credentials: "include",
          body: {
            email: email.value,
            password: password.value,
          },
          method: "POST",
        }
      );
      email.value = "";
      password.value = "";
      return error;
    };

    return { email, password, login };
  },
  { persist: true }
);
