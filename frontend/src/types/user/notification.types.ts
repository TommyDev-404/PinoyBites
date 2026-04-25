import type { OrdersInfo, OrderStatus } from "./order.types"

export type ViewOrderPayload = {
	user_id: number,
	order_id: number, 
      notif_id: number,
      status: OrderStatus
}

export type UserNotificationsInfo = {
      notif_id: number,
      user_id: number,
      notif_type: string, // e.g., 'order', 'promo', 'alert'
      is_read: boolean,
      created_at: Date,
      message: string,
      orders: OrdersInfo,
      status: OrderStatus
}

export type ProductItemInfoForRating = {
      product_id: number,
      name: string,
      image_url: string,
      price: number,
      quantity: number,
      is_rated: boolean,
      rating: number
}

export type ProductToBeRatedInfo = {
      user_id: number,
      notif_id: number,
      order_id: number,
      items: ProductItemInfoForRating[]
}

export type ProductAlreadyRatedInfo = {
      product_id: number,
      rating: number,
      comment: string
}

export type SubmitProductRatingInfo = {
      user_id: number,
      order_id: number,
      notif_id: number,
      products: ProductAlreadyRatedInfo[]
}