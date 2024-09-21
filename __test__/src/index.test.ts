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
		const resp = await worker.fetch("http://localhost:8787/api/invalid");

		const jsonResponse = await resp.json();
		expect(jsonResponse).toMatchSnapshot();
	});
});
