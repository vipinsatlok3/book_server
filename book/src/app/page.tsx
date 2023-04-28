import Link from "next/link";
import { GrBook } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { IUserResponce } from "@/types/users"

async function getUser() {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data;
}

export default async function Home() {

  const { success, user } = await getUser() as IUserResponce;

  if (!success) {
    return new Error();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col  text-xl font-bold">
        <h2 className="text-xs font-semibold">Sat Saheb</h2>
        <h2 className="text-md mb-4 capitalize font-semibold">{user.name} Ji</h2>
      </div>
      <Link
        className="flex gap-4 items-center text-xl font-bold rounded bg-yellow-500 p-4"
        href="/users"
      >
        <GrBook />
        <h2>View Users</h2>
      </Link>
      <Link
        className="flex gap-4 items-center text-xl font-bold rounded bg-yellow-500 p-4"
        href="/books"
      >
        <BiUser />
        <h2>View Books</h2>
      </Link>
    </div>
  );
}
