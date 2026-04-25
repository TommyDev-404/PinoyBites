
export type CustomerFeaturedReviewsType = {
      overall_rating: number,
      total_reviews: number,
      star_percentage: StarPercentageInfo[],
      reviews: ReviewsInfo[]
}

export type ReviewsInfo = {
      users: { 
            username: string
      },
      rating: number,
      comment: string,
      created_at: Date
}

export type StarPercentageInfo = {
      rating: number,
      percentage: number,
}