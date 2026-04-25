import { z } from "zod";

export const MarkNotifAsReadSchema = z.object({
      notif_id: z.coerce.number(),
});


