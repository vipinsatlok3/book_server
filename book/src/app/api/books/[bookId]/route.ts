import { connectDB } from "@/database/config";
import { bookModel } from "@/database/models/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { bookId: string } }) {
    await connectDB();
    try {
        const book = await bookModel.findById(params.bookId);
        return NextResponse.json({ success: true, book }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
