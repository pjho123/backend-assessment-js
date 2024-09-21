import router from "./routes";

export interface Env {
	PGHOST: string,
	PGDATABASE: string,
	PGUSER: string,
	PGPASSWORD: string,
	ENDPOINT_ID: string,
}

export default {
  fetch: router.fetch,
}
