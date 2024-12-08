import { createTuyau } from "@tuyau/client";
import { api } from "@rlanz/site/api";

export const client = createTuyau({
  api,
  baseUrl: globalThis.RomainLanz.appUrl,
});
