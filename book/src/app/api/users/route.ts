import { connectDB } from "@/database/config";
import { bookModel } from "@/database/models/books";
import { userModel } from "@/database/models/users";
import { IUser } from "@/types/users";
import { IBooks } from "@/types/books";
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
    const users = await userModel.find() as IUser[];
    const books = await bookModel.find() as IBooks[];
    const total = users.map(item => {
      const bookFilterByUser = books.filter(item => item.userId === item._id) as IBooks[];;
      const bookTotalOfAllUser = bookFilterByUser.reduce((total, item) => {
        const countAll = item.books.reduce((total, book) => total + book.sell, 0) as number;
        return countAll + total;
      }, 0)
      const obj = { ...item, count: bookTotalOfAllUser };
    });


    return NextResponse.json({ success: true, users: total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
