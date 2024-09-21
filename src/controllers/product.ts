import { error } from "itty-router";
import { TDeleteProductRequest } from "../interfaces/product";
import ProductFormatter from "../lib/product-formatter";
import ThirdPartyDataSource from "../lib/thirdparty-datasource";
import ProductService from "../services/product-service";
import dayjs from "dayjs";

class ProductsController {
  static async get(): Promise<Response> {
    const data = await ThirdPartyDataSource.getData();
    const transformedProducts = ProductFormatter.format(data);

    await ProductService.createBulk(transformedProducts);

    return Response.json({ message: 'Third Party Data has been added to the DB.' });
  }

  static async create(): Promise<Response> {
    const data = await ThirdPartyDataSource.getProductData();
    const transformedProducts = ProductFormatter.format(data);

    await ProductService.createBulk(transformedProducts);

    const products = await ProductService.getByIds(transformedProducts.map(d => d.id));
    return Response.json({
      products: products.map(p => ({
        ProductID: p.id,
        Title: p.title,
        Tags: p.tags,
        CreatedAt: dayjs(p.created_at).toString(),
        UpdatedAt: dayjs(p.updated_at).toString(),
        ProductCode: p.sku,
      }))
    });
  }

  static async update(): Promise<Response> {
    const products = await ProductService.getAll();

    const result = [];
    for (const product of products) {
      let updatedProduct = product;

      if (!product.title.includes(product.sku)) {
        updatedProduct = await ProductService.updateProductById(product.id, {
          title: `${product.title} ${product.sku}`,
        });
      }

      result.push(updatedProduct);
    }

    return Response.json({
      products: result.map(p => ({
        ProductID: p.id,
        Title: p.title,
        Tags: p.tags,
        CreatedAt: dayjs(p.created_at).toString(),
        UpdatedAt: dayjs(p.updated_at).toString(),
        ProductCode: p.sku,
      }))
    });
  }

  static async delete({ product_id }: TDeleteProductRequest): Promise<Response> {
    const product = await ProductService.getById(product_id);

    if (!product) {
      return error(400, 'Product not found.');
    }

    await ProductService.delete(product_id);

    return Response.json({ message: 'Product has been successfully deleted.' });
  }
}

export default ProductsController;
