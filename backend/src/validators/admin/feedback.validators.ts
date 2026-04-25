import { z } from "zod";

export const GetAllFeedbackSchema = z.object({
      filter: z.enum(["all", "system", "product"]).default("all"),
      sort: z.enum(["newest", "oldest", "rating", "best"]).default("newest"),
});

export const ReplyFeedbackSchema = z.object({
      review_id: z.coerce.number(),
      reply: z.string()
});

export const MarkFeaturedFeedbackSchema = z.object({
      review_id: z.coerce.number()
});

export type FeedbackFilter = "all" | "system" | "product";

export type FeedbackSort = "newest" | "oldest" | "rating" | "best";