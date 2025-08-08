import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  agentId: z.string().min(1, { message: "Agent are Required" }),
});

export const meetingUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
