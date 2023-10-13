import { defineStore } from "pinia";

export const usePostStore = defineStore("post", () => {
  const item = ref();

  const search = async () => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/posts?limit=10",
      {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

  };

  return { item, search  };
});
