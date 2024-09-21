import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import ProductService from "../../../src/services/product-service";
import ProductsController from "../../../src/controllers/product";
import ThirdPartyDataSource from "../../../src/lib/thirdparty-datasource";
import { IProduct, TDeleteProductRequest } from "../../../src/interfaces/product";

describe("Worker", () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
		});
		vi.mock("./person", () => {
			const Person = vi.fn(() => ({
				getAge: vi.fn(() => 15),
			}));
			return { Person };
		});
		// vi.mock('../../../src/services/product-service', () => {
		// 	// const ProductService = vi.fn();
		// 	// ProductService.prototype.createBulk = vi.fn(() => 15);
		// 	const ProductService = vi.fn(() => ({
		// 		getAll: vi.fn().mockResolvedValue(true),
		// 		getById: vi.fn().mockResolvedValue(true),
		// 		getByIds: vi.fn().mockResolvedValue(true),
		// 		updateProductById: vi.fn().mockResolvedValue(true),
		// 		createBulk: vi.fn().mockResolvedValue(true),
		// 		delete: vi.fn().mockResolvedValue(true),
		// 	}));
		// 	return { default: ProductService };
		// });
		const product: IProduct = {
			id: 11111,
			title: 'Sample Product',
			tags: 'tags',
			created_at: '',
			updated_at: '',
			sku: 'sample-sku',
		};
		vi.spyOn(ProductService, 'getAll').mockResolvedValue([product]);
		vi.spyOn(ProductService, 'getById').mockResolvedValue(product);
		vi.spyOn(ProductService, 'getByIds').mockResolvedValue([product]);
		vi.spyOn(ProductService, 'updateProductById').mockResolvedValue(product);
		vi.spyOn(ProductService, 'createBulk').mockResolvedValue([product]);
		vi.spyOn(ProductService, 'delete').mockResolvedValue(true);

		vi.spyOn(ThirdPartyDataSource, 'getData').mockResolvedValue([{
			title: 'Sample Product 1',
			tags: 'tag1',
			variants: [{
				id: 111111,
				title: 'variant-title1',
				sku: 'SKU1',
				updated_at: '2024-07-28T20:15:18-04:00',
				created_at: '2024-07-28T20:14:32-04:00',
			}]
		}]);
		vi.spyOn(ThirdPartyDataSource, 'getProductData').mockResolvedValue([{
			title: 'Sample Product 2',
			tags: 'tag2',
			variants: [{
				id: 22222,
				title: 'variant-title2',
				sku: 'SKU2',
				updated_at: '2024-07-28T20:15:18-04:00',
				created_at: '2024-07-28T20:14:32-04:00',
			}]
		}]);
	});

	afterAll(async () => {
		await worker.stop();
	});

	describe('Controller for GET /api/products', () => {
		it("should return 200", async () => {
			const resp = await ProductsController.get();

			const jsonResponse = await resp.json();

			expect(resp.status).toBe(200);
			expect(jsonResponse).toMatchSnapshot();
		});
	});

	describe('Controller for POST /api/products', () => {
		it("should return 200", async () => {
			const resp = await ProductsController.create();

			const jsonResponse = await resp.json();

			expect(resp.status).toBe(200);
			expect(jsonResponse).toMatchSnapshot();
		});
	});

	describe('Controller for PUT /api/products', () => {
		it("should return 200", async () => {
			const resp = await ProductsController.update();

			const jsonResponse = await resp.json();

			expect(resp.status).toBe(200);
			expect(jsonResponse).toMatchSnapshot();
		});
	});

	describe('Controller for DELETE /api/products', () => {
		it("should return 200", async () => {
			// @ts-ignore
			const resp = await ProductsController.delete({ product_id: 12345 });

			const jsonResponse = await resp.json();

			expect(resp.status).toBe(200);
			expect(jsonResponse).toMatchSnapshot();
		});
	});
});
