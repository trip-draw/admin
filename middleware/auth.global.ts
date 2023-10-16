

import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const whitelist = ["/login"];
  const authStore = useAuthStore();
  if (!whitelist.includes(to.fullPath) && !authStore.isLogined) {
    return navigateTo("/login");
  }
});
