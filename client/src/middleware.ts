import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { IUser } from "@/types/users";

export function middleware(req: NextRequest) {
  // const { value } = req.cookies.get("user") as {
  // value: string;
  // };

  // if (!value) return NextResponse.redirect(new URL("/login", req.url));

  // const user = JSON.parse(value) as IUser;
  // if (req.nextUrl.pathname.startsWith("/users")) {
  //   if (user.role !== "admin")
  //     return NextResponse.redirect(new URL("/", req.url));
  //   NextResponse.next();
  // }

  NextResponse.next();
}

export const config = {
  matcher: ["/users", "/books"],
};
