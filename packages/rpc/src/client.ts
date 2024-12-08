import { createTuyau } from "@tuyau/client";
import { api } from "@rlanz/site/api";

export const client = createTuyau({
  api,
  baseUrl: import.meta.env.VITE_APP_URL,
});
