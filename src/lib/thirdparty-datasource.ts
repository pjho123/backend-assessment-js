import { IThirdPartyResponse } from "../interfaces/product";

class ThirdPartyDataSource {
  static async getData() {
    const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get');

    const { products } = await response.json() as IThirdPartyResponse;

    return products;
  }

  static async getProductData() {
    const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts');

    const { products } = await response.json() as IThirdPartyResponse;

    return products;
  }
};

export default ThirdPartyDataSource;
