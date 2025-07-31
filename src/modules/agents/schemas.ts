import { z } from "zod";

export const agentInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  instructions: z.string().min(1, { message: "Intructions are Required" }),
});
