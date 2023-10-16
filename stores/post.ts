import { defineStore } from "pinia";

export const usePostStore = defineStore("post", () => {
  const load = ref(false);
  const items: any = ref([]);
  const hasNextPage: any = ref(true);

  const search = async () => {
    if (load.value || !hasNextPage.value) {
      return;
    }
    load.value = true;
    let param = "";
    if (items.value.length) {
      param = "&lastViewId=" + items.value[items.value.length - 1].postId;
    }
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/posts?limit=10" + param,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const result: any = data.value;  
    result.items.forEach((post: any) => {
      items.value.push(post);
    });
    hasNextPage.value = result.hasNextPage;
    load.value = false;
  };

  const clear = async () => {
    items.value = [];
    load.value = false;
    hasNextPage.value = true;
  };

  const remove = async (id: any) => {
    items.value = items.value.filter((item) => item.postId !== id);

    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/posts/" + id,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
  };

  return { items, search, clear, remove };
});
