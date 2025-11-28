// GET /api/services
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const services = await prisma.service.findMany({
        where: { status: true },
        orderBy: { name: "asc" },
        select: {
            id: true,
            code: true,
            name: true,
            duration: true,
            price: true,
        },
    });

    return NextResponse.json({ items: services });
}
