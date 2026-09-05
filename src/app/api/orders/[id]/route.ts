import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID format - chỉ cho phép cuid
    if (!id || typeof id !== 'string' || id.length < 10 || id.length > 30) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      select: { status: true }
    });

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ status: order.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
