import { defineStore } from "pinia";

export const usePostStore = defineStore("post", () => {
  const items = ref();

  const search = async () => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/posts?limit=50",
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    items.value = data.value;
  };

  const clear = async () => {
    items.value = ref();
  };

  const remove = async (id: any) => {
    items.value.items = items.value.items.filter((item) => item.postId !== id);

    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/trips/" + id,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
  };

  return { items, search, clear, remove };
});
