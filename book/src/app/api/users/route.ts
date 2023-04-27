import { connectDB } from "@/database/config";
import { userModel } from "@/database/models/users";
import { IUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, number } = (await req.json()) as IUser;
  const password = Math.ceil(Math.random() * 10000000099);

  try {
    const users = await userModel.create({ name, password, number });
    return NextResponse.json({ success: true, users }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const users = await userModel.find();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
