import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const UserIDSchema = z.object({
      user_id: z.coerce.number()
});

// Body: any of the fields to update
export const UpdateProfileBodySchema = z.object({
      username: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
      contact_bum: z.string().optional(),
      profile_image: z.string().optional(), // URL or base64 string
});

export type UpdateProfileType = z.infer<typeof UpdateProfileBodySchema>;