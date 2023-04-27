import Link from "next/link";
import { GrBook } from "react-icons/gr";
import { BiUser } from "react-icons/bi";

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col  text-xl font-bold">
        <h2 className="text-xs font-semibold">Sat Saheb</h2>
        <h2 className="text-md mb-4 font-semibold">Vipin Das Ji</h2>
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
