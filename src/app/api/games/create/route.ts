/**
 * API Route: Create a new game
 *
 * POST /api/games/create
 * Body: { "code": "ROOM123" }
 *
 * Test with curl:
 * curl -X POST http://localhost:3000/api/games/create \
 *   -H "Content-Type: application/json" \
 *   -d '{"code":"ROOM123"}'
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Game code is required" },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: {
        code,
        status: "waiting",
        deck: [],
        discardPile: [],
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
