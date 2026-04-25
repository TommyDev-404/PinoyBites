
export type IndividualPromoCodeInfo = {
      id: number,
      loyalty_tiers: { tier_name: string },
      discount: number,
      expires_at: Date
}

export type LoyaltyTierInfo = {
      id?: number,
      tier_name: string,
      required_spent: number,
      valid_days: number,
      discount: number
}

export type UpdateLoyaltyTierInfo = Partial<LoyaltyTierInfo>;

export type PromoCodeInfo = {
      id: number,
      loyalty_tiers: { tier_name: string },
      users: { username: string},
      code: string,
      discount: number,
      expires_at: Date,
      created_at: Date
}

export type PromoStatisticsInfo = {
      active_promo: number,
      promo_issued: number,
      loyalty_tiers: number
}

