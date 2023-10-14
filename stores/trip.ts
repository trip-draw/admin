import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", () => {
  const items = ref();

  const search = async () => {
    const { data, error } = await useFetch(
      useRuntimeConfig().public.baseUrl + "/admin/trips?limit=50",
      {
        credentials: 'include',
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
  }

  const remove = async(id: any) => {
    items.value.items = items.value.items.filter(item => item.tripId !== id);
  }

  return { items, search, clear, remove  };
});
