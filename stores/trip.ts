import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", () => {
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
      param = "&lastViewId=" + items.value[items.value.length - 1].tripId;
    }
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "admin/trips?limit=10" + param,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const result: any = data.value;  
    result.items.forEach((trip: any) => {
      items.value.push(trip);
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
    items.value = items.value.filter((item) => item.tripId !== id);

    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "admin/trips/" + id,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
  };

  return { items, search, clear, remove };
});
