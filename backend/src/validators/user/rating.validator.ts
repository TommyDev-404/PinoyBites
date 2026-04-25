import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const RateSystemExperienceSchema = z.object({
      userId: z.coerce.number(),
      rating: z.coerce.number(),
      comment: z.string()
});

export const CanUserRateSchema = z.object({
      userId: z.coerce.number()
});