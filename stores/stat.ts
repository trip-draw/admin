import { defineStore } from "pinia";

export const useStatStore = defineStore("stat", () => {
  const item: any = ref();

  const search = async () => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/stats",
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    item.value = data.value;
  };
  return { item, search };
});

