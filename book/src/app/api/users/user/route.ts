import { connectDB } from "@/database/config";
import { userModel } from "@/database/models/users";
import { IUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    await connectDB();
    const user: IUser = JSON.parse(req.cookies.get("user")?.value as string) as IUser;
    if (!user._id) return NextResponse.json({ success: false, error: "login first" }, { status: 401 });

    try {
        const userData = await userModel.findById(user._id);
        return NextResponse.json({ success: true, user: userData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}