import { IProduct, IThirdPartyProduct } from "../interfaces/product";

class ProductFormatter {
  static format(data: IThirdPartyProduct[]): IProduct[] {
    const products: IProduct[] = [];

    data.forEach((item) => {
      const variantProducts = this.formatProduct(item);
      products.push(...variantProducts);
    });

    return products;
  }

  static formatProduct(product: IThirdPartyProduct): IProduct[] {
    return product.variants.map(d => ({
      id: d.id,
      title: `${product.title} ${d.title}`,
      tags: product.tags,
      created_at: d.created_at,
      updated_at: d.updated_at,
      sku: d.sku,
    }));
  }
}

export default ProductFormatter;
