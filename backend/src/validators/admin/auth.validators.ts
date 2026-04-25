import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const LoginAdminSchema = z.object({
      username: z.string(),
      password: z.string()
});
