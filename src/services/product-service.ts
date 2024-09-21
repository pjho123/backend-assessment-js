import { IProduct } from "../interfaces/product";
import DB from "../lib/db";

class ProductService {
  static async getAll(): Promise<IProduct[]> {
    const products = await DB.sql<IProduct[]>`SELECT * FROM products;`;

    return products;
  }

  static async getById(id: number): Promise<IProduct> {
    const [product]: IProduct[] = await DB.sql`SELECT * FROM products WHERE id = ${id};`;

    return product;
  }

  static async getByIds(ids: number[]): Promise<IProduct[]> {
    const product: IProduct[] = await DB.sql`SELECT * FROM products WHERE id in ${DB.sql(ids)};`;

    return product;
  }

  static async updateProductById(id: number, data: Partial<IProduct>): Promise<IProduct> {
    const columns = Object.keys(data) as Array<keyof IProduct>;
    const product: IProduct[] = await DB.sql`UPDATE products SET ${DB.sql(data, columns)}, updated_at = ${DB.sql`now()`} WHERE id = ${id} RETURNING *;`;

    return product[0];
  }

  static async createBulk(products: IProduct[]): Promise<IProduct[]> {
    const columns = Object.keys(products[0]) as Array<keyof IProduct>;
    const result: IProduct[] = await DB.sql`INSERT INTO products ${DB.sql(products, columns)} ON CONFLICT (id) DO NOTHING;`;

    return result;
  }

  static async delete(id: number): Promise<boolean> {
    await DB.sql`DELETE FROM products WHERE id=${id}`;

    return true;
  }
}

export default ProductService;
