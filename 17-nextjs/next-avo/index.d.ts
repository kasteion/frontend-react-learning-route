type Url = string;
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

type TProductId = string;

type TProductAttributes = {
  description: string;
  shape: string;
  hardiness: string;
  taste: string;
};

type TProduct = {
  id: TProductId;
  name: string;
  sku: string;
  price: number;
  image: Url;
  attributes: TProductAttributes;
};

type TAPIAVODetailResponse = TProduct;

type TAPIAvoResponse = {
  lenght: number;
  data: TProduct[];
  error?: string;
};

type TCart = {
  product: TProduct;
  number: number;
};

type TState = {
  cart: Array<TCart>;
};

type TUseInitialState = {
  addToCart: Function;
  removeFromCart: Function;
  state: TState;
};
