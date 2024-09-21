import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return 404 not found if route is invalid", async () => {
		const resp = await worker.fetch("http://localhost:8787/api/invalid", { method: 'GET', headers: { 'x-api-key': 'c6c687a0a7209f877f89a40824907ae5' } });

		const jsonResponse = await resp.json();
		expect(jsonResponse).toMatchSnapshot();
	});

	it("should return 401 not found if no api key in the headers", async () => {
		const resp = await worker.fetch("http://localhost:8787/api/invalid", { method: 'GET' });

		const jsonResponse = await resp.json();
		expect(jsonResponse).toMatchSnapshot();
	});
});
