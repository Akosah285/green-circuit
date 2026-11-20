import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "online",
    message: process.env.SYSTEM_STATUS_MESSAGE || "Running on Azure Static Web Apps",
    accessLevel: process.env.LAB_ACCESS_LEVEL || "standard",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}