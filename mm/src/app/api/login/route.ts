import { connectDB } from "@/database/config";
import { userModel } from "@/database/models/users";
import { IUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    await connectDB()
    const { password, number } = await req.json() as IUser

    if (!(password || number)) return new Error("All Fields are Required!")

    try {
        const user = await userModel.findOne({ number, password })
        if (!user) return new Error("Password or Email is Wrong!")

        return NextResponse
            .json({ success: true, user }, { status: 200 })
            .cookies.set("auth", JSON.stringify(user))
    } catch (error) {
        return new Error("server error")
    }
}