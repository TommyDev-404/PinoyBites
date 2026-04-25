
export type CartItemTypes = {
      product_id: number;
      name: string;
      description: string;
      price: number;
      image_url: string;
      category: string;
}

export type CartTypes = {
      cart_id: number;
      quantity: number;
      created_at: Date;
      products: CartItemTypes;
}

export type PlaceOrderProductType = {
      product_id: number;
      name: string;
      image_url: string;
      price: number;
      quantity: number;
      subtotal: number;
      delivery_fee: number;
}

export type CheckOutPayload = {
      products: PlaceOrderProductType[];
      totalPrice: number;
};

export type PromoInfo = {
      id: number,
      tier_name: string,
      discount: number
};