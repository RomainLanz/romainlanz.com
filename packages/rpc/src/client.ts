import { createTuyau } from "@tuyau/client";
import { api } from "@rlanz/site/api";

export const client = createTuyau({
  api,
  baseUrl: "http://romainlanz.localhost:3333",
});
