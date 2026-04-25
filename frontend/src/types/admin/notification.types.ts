
export type NotificationType = 'new_order' | 'order_cancelled' | 'new_user' | 'promo' |'account_banned' | 'account_active'

export type AdminNotificationsInfo = {
      notif_id: number,
      message: string,
      is_read: boolean,
      created_at: Date,
      notif_type : NotificationType
}