import { moveTicketSchema } from "@/schema/moveTicketSchema";
import { prisma } from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request?.json();
    const schemaValidation = moveTicketSchema.safeParse(body);

    if (!schemaValidation.success) {
      return NextResponse.json(
        { error: { message: "Invalid request body" } },
        { status: 400 }
      );
    }
    
    const { ticketId, boardColumnId, boardId, position } = body;
    // console.log("ticketId", ticketId);
    // console.log("boardColumnId", boardColumnId);

    if (!ticketId || !boardColumnId || !boardId || !position) {
      return NextResponse.json(
        { error: { message: "Fields are missing" } },
        { status: 400 }
      );
    }

    const updatedTicket = await prisma.boardTicket.update({
      where: {
        id: ticketId,
      },
      data: {
        boardColumnId,
        boardId,
        position,
      },
    });

    return NextResponse.json({ data: updatedTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
};
