import { connectDB } from "@/database/config";
import { bookModel } from "@/database/models/books";
import { IUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   await connectDB();
//   const { name, number } = (await req.json()) as IUser;
//   const password = Math.ceil(Math.random() * 10000000099);

//   try {
//     const users = await userModel.create({ name, password, number });
//     return NextResponse.json({ success: true, users }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  await connectDB();
  const user: IUser = JSON.parse(req.cookies.get("user")?.value as string) as IUser;
  if (!user._id) return NextResponse.json({ success: false, error: "login first" }, { status: 401 });

  try {

    let books

    if (user.role === "admin") {
      books = await bookModel.find();
    } else {
      books = await bookModel.find({ userId: user._id });
    }

    return NextResponse.json({ success: true, books }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
