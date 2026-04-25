
export type CustomersInfo = {
      user_id: number,
      username: string,
      profile_image: string,
      address: string,
      email: string,
      contact_num: number, 
      loyalty_tier: string,
      total_orders: number,
      total_spent: number,
      account_status: 'Active' | 'Banned'
}

export type CustomerStatisticsType = {
      total: number,
      active: number,
      banned: number
}

export type BanUserData = {
      reason: string,
      duration: number,
}

export type UnBanUserData = {
      reason?: string,
}