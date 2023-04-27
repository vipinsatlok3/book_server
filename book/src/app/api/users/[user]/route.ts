import { connectDB } from "@/database/config";
import { userModel } from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  await connectDB();
  try {
    const user = await userModel.findById(params.user);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
