import router from "./routes";

export interface Env {
	PGHOST: string,
	PGDATABASE: string,
	PGUSER: string,
	PGPASSWORD: string,
	ENDPOINT_ID: string,
	API_KEY: string
}

export default {
  fetch: router.fetch,
}
