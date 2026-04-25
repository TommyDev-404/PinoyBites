
export type FeedBackStatisticsType = {
      total_feedback: number,
      avg_rating: number,
      good_feedback: number,
      bad_feedback: number,
      user_rated_count: number,
}

export type AllFeedbackType = {
      review_id: number,
      category: "Product" | "System",
      rating: number,
      comment: string,
      username: string,
      status: "Good" | "Neutral" | "Bad",
      created_at: Date,
      is_replied: boolean,
      is_featured_review: boolean
}

export type FeedbackFilter = "all" | "system" | "product";
export type FeedbackSort = "newest" | "oldest" | "rating" | "best";