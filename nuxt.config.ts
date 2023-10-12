export default defineNuxtConfig({
  ssr: false,
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "",
    },
  },
});