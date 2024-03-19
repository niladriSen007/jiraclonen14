import { z } from "zod";

export const moveTicketSchema = z.object({
  ticketId: z.string(),
  boardColumnId: z.string(),
  boardId: z.string(),
  position: z.number(),
});
