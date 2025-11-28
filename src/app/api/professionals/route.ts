// GET /api/professionals
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const professionals = await prisma.professional.findMany({
    where: { status: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      specialties: true,
    },
  });

  return NextResponse.json({ items: professionals });
}
