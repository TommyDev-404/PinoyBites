import type { PlaceOrderProductType } from "./cart.types"

export type PaymentMethod = "Gcash" | "COD"
export type OrderStatus = 'Processing' | 'In_Transit' | 'Cancelled' | 'Returned' | 'Delivered' | 'Pending' | 'All'

export type PlaceOrderInfo = {
      user_id: number,
      shipping_address: string,
      order_date: string,
      order_time: string,
      special_instructions: string,
      total_price: number,
      payment_method: PaymentMethod,
      product_items: PlaceOrderProductType[]
}

export type OrderItems = {
      product_id: number,
      name: string,
      image_url: string,
      price: number,
      quantity: number,
      subtotal: number,
      delivery_fee: number,
      is_rated?: boolean,
      rating?: number
}

export type OrdersInfo = {
      order_id: number;
      order_date: string;
      status: OrderStatus;
      total_price: number;
      promo_code: string;
      order_items: OrderItems[]
}

export type UserFeedbackType = {
      user_id: number,
      rating: number,
      comment: string
}

