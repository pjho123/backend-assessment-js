import { IRequestStrict } from "itty-router"

export interface IProduct {
  id: number,
  title: string,
  tags: string,
  created_at: string,
  updated_at: string,
  sku: string,
}

interface IThirdPartyProductVariant {
  id: number,
  title: string,
  sku: string,
  created_at: string,
  updated_at: string,
}

export interface IThirdPartyProduct {
  title: string,
  tags: string,
  variants: IThirdPartyProductVariant[]
}

export interface IThirdPartyResponse {
  products: IThirdPartyProduct[],
}

export type TDeleteProductRequest = {
  product_id: number
} & Request;
