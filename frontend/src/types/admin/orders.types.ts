

export type AdminOrderItem = {
      product_id: number;
      name: string;
      quantity: number;
      price: string;
};

export type AdminAllOrdersInfo = {
      user_id: true,
      order_id: number;
      order_date: string;
      order_time: string;
      status: string;
      shipping_address: string;
      special_instruction?: string;
      total_price: string;
      payment_method: string;
      promo_code: string;
      order_items: AdminOrderItem[];
      users: {
            username: string;
            contact_num: string;
      };
};

export type OrderStatisticsType = {
      total: number,
      today: number,
      pending: number,
      processing: number,
      in_transit: number,
      delivered: number,
      cancelled: number,
}