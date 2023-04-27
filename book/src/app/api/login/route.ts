import { connectDB } from "@/database/config";
import { userModel } from "@/database/models/users";
import { IUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const { password, number } = (await req.json()) as IUser;

  if (!(password || number))
    return NextResponse.json(
      { success: false, error: "email or password is required!" },
      { status: 401 }
    );

  try {
    const user = (await userModel.findOne({ number, password })) as IUser;
    if (!user)
      return NextResponse.json(
        { success: false, error: "email or password wrong!" },
        { status: 401 }
      );

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, error }, { status: 500 });
  }
}
