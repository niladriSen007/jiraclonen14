import { prisma } from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request?.json();
    const { ticketId, boardColumnId, boardId, position } = body;
    // console.log("ticketId", ticketId);
    // console.log("boardColumnId", boardColumnId);

    if (!ticketId || !boardColumnId || !boardId || !position) {
      return NextResponse.json(
        { error: { message: "Fields are missing" } },
        { status: 400 }
      );
    }

    const ticket = await prisma.boardTicket.findUniqueOrThrow({
      where: {
        id: ticketId,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: { message: "Ticket not found" } },
        { status: 404 }
      );
    }

    const boardColumn = await prisma.boardColumn.findUniqueOrThrow({
      where: {
        id: boardColumnId,
      },
    });

    if (!boardColumn) {
      return NextResponse.json(
        { error: { message: "Board column not found" } },
        { status: 404 }
      );
    }

    const data = await Promise.all([ticket, boardColumn]);

    if (data) {
      const updatedTicket = await prisma.boardTicket.update({
        where: {
          id: ticketId,
        },
        data: {
          boardColumnId: boardColumnId,
          boardId: boardId,
          position: position,
        },
      });

      return NextResponse.json({ data: updatedTicket });
    }


    return NextResponse.json(
        { error: { message: "Please enter valid details" } },
        { status: 500 }
        );
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
};
