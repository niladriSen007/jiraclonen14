import { prisma } from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boardId = searchParams.get("boardId");
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");
    console.log("boardId", boardId);
    console.log("skip", skip);
    console.log("take", take);

    if (!boardId || !skip || !take) {
      return NextResponse.json(
        { error: { message: "Fields are missing" } },
        { status: 400 }
      );
    }

    const board =  prisma.board.findUniqueOrThrow({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      return NextResponse.json(
        { error: { message: "Board not found" } },
        { status: 404 }
      );
    }

    const boardColumns =  prisma.boardColumn.findMany({
      where: {
        boardId: boardId,
      },
    });

    if (!boardColumns) {
      return NextResponse.json(
        { error: { message: "Board columns not found" } },
        { status: 404 }
      );
    }

    const boardTickets =  prisma.boardTicket.findMany({
      where: {
        boardId: boardId,
      },
      skip: parseInt(skip),
      take: parseInt(take),
    });

    if (!boardTickets) {
      return NextResponse.json(
        { error: { message: "Board tickets not found" } },
        { status: 404 }
      );
    }


    const data = await Promise.all([board, boardColumns, boardTickets]);



    

    return NextResponse.json(
      {
        data:{
          board: data[0],
          boardColumns: data[1],
          boardTickets: data[2]
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
