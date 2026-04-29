import { z } from "zod";

export const createConcertSchema = z.object({
  name: z.string().min(1, "Concert name is required"),
  totalSeats: z.coerce
    .number()
    .int("Total seats must be an integer")
    .min(1, "Total seats must be at least 1"),
  description: z.string().min(1, "Description is required"),
});

export type CreateConcertInput = z.input<typeof createConcertSchema>;
export type CreateConcertForm = z.output<typeof createConcertSchema>;
