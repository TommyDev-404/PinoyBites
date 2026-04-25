import type { CustomersInfo, CustomerStatisticsType } from "./admin/customers.types";
import type { DashboardStatistics, OrderStatusDistributionType, RecentOrdersInfo, TopCustomers, TopSellingProducts } from "./admin/dashboard.types";
import type { AdminNotificationsInfo } from "./admin/notification.types";
import type { AdminAllOrdersInfo, OrderStatisticsType } from "./admin/orders.types";
import type { AllProductsInfo, IndividualProductInfo } from "./admin/products.types";
import type { LoyaltyTierInfo, PromoCodeInfo, PromoStatisticsInfo } from "./admin/promo.types";
import type { AccountCheckInfoType, AccountInfoType } from "./user/account.types";
import type { UserData } from "./user/auth.types";
import type { CartTypes, PromoInfo } from "./user/cart.types";
import type { CustomerFeaturedReviewsType } from "./user/featured-reviews.types";
import type { AllFeedbackType, FeedBackStatisticsType } from "./user/feedback.types";
import type { UserNotificationsInfo } from "./user/notification.types";
import type { OrdersInfo } from "./user/order.types";
import type { ProductType } from "./user/products.types";

// Common api response, no extra data
export type NormalApiResponse<T = {}> = {
      success: boolean,
      message: string;
} & T;

// notifications 
export type ViewOrderApiResponse = NormalApiResponse<{
      orders: OrdersInfo;
}>;

export type NotificationsApiResponse = NormalApiResponse<{
      notifications: UserNotificationsInfo[];
}>;

export type AdminNotReadNotifCountResponse = NormalApiResponse <{
      count: number
}>;

// orders
export type GetOrdersApiResponse = NormalApiResponse<{
      orders: OrdersInfo[];
}>;

export type UserFeedbackApiResponse = NormalApiResponse<{
      is_reviewed: boolean;
}>;

// carts
export type GetCartsApiResponse = NormalApiResponse <{
      cart_items: CartTypes[];
}>;

// products
export type GetProductsInfo = NormalApiResponse <{
      products: ProductType[];
}>;

// account && auth
export type AccountInfoResponseType = NormalApiResponse <{
      user: AccountInfoType
}>;

// email verification
export type EmailVerificationResponseType = NormalApiResponse <{
      user_id: number
}>;

// get user promo
export type UserPromoReceivedResponse = NormalApiResponse <{
      promo: PromoInfo
}>;

// get featured customer reviews
export type GetFeaturedCustomerReviewsResponse = NormalApiResponse <{
      payload: CustomerFeaturedReviewsType
}>;

// admin orders
export type AdminGetOrdersResponse = NormalApiResponse <{
      orders: AdminAllOrdersInfo[]
}>;

// admin order statistics
export type AdminOrderStatisticsResponse = NormalApiResponse <{
      order_stats: OrderStatisticsType
}>;

// admin notifications
export type AdminNotificationsResponse = NormalApiResponse <{
      notifications: AdminNotificationsInfo[]
}>;

// admin products
export type AdminProductsResponse = NormalApiResponse <{
      products: AllProductsInfo[]
}>;

// admin customer order history
export type AdminAllCustomerOrderHistoryResponse = NormalApiResponse <{
      orders: OrdersInfo[]
}>;

// admin individaul products
export type AdminIndividualProductInfoResponse = NormalApiResponse <{
      product: IndividualProductInfo;
}>;

// admin all customer 
export type AdminAllCustomersResponse = NormalApiResponse <{
      customers: CustomersInfo[]
}>;

// admin customer statistics 
export type AdminCustomerStatisticsResponse = NormalApiResponse <{
      statistics: CustomerStatisticsType
}>;

// admin login 
export type AdminLoginResponse = NormalApiResponse <{
      user: UserData
}>;

// admin loyalty tiers 
export type AdminGetLoyaltyTierResponse = NormalApiResponse <{
      loyalty_tiers: LoyaltyTierInfo[]
}>;

// admin issued promo codes
export type AdminGetIssuedPromoCodesResponse = NormalApiResponse <{
      promo_codes: PromoCodeInfo[]
}>;

// admin issued promo codes
export type AdminGetPromoStatisctisResponse = NormalApiResponse <{
      statistics: PromoStatisticsInfo
}>;

// admin dashboard statistics
export type AdminGetDashboardStatisctisResponse = NormalApiResponse <{
      statistics: DashboardStatistics
}>;

// admin dashboard recent orders
export type AdminGetRecentOrdersResponse = NormalApiResponse <{
      recent_orders: RecentOrdersInfo[]
}>;

// admin dashboard order status distribution
export type AdminGetOrderStatusDistributionResponse = NormalApiResponse <{
      status: OrderStatusDistributionType[]
}>;

// admin dashboard top selling products
export type AdminGetTopSellingProductsResponse = NormalApiResponse <{
      products: TopSellingProducts[]
}>;

// admin dashboard top customers
export type AdminGetTopCustomersResponse = NormalApiResponse <{
      customers: TopCustomers[]
}>;

// admin dashboard top customers
export type AdminGetUserCurrentlyLggedResponse = NormalApiResponse <{
      user: AccountCheckInfoType
}>;

// admin feedback statistics
export type AdminGetFeedbackStatisticsResponse = NormalApiResponse <{
      statistics: FeedBackStatisticsType
}>;

// admin all feedback 
export type AdminGetAllFeedbackResponse = NormalApiResponse <{
      feedbacks: AllFeedbackType[]
}>;