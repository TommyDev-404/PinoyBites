import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const RegisterSchema = z.object({
      username : z.string(),
      email: z.string(),
      contact: z.string(),
      address: z.string(),
      password: z.string(),
      hash_pass: z.string().optional()
});

export const LoginSchema = z.object({
      email: z.string(),
      password: z.string()
});

export const VerifyEmailSchema = z.object({
      email: z.string(),
});

export const VerifyCodeSchema = z.object({
      user_id: z.coerce.number(),
      code: z.string()
});

export const UpdatePasswordSchema = z.object({
      user_id: z.coerce.number(),
      password: z.string()
});


export type RegisterType = z.infer<typeof RegisterSchema>;
