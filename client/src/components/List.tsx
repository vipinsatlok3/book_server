import { IList } from "@/types/common";
import Link from "next/link";

export default function List({ _id, name, subname, count, index }: IList) {
  return (
    <Link className="w-full" href={`/users/${_id}`}>
      <li className="flex items-center gap-4 w-full">
        <div className="sr w-10 h-10 flex justify-center items-center rounded-full bg-gray-600 text-white">
          {index + 1}
        </div>
        <div className="info flex-1">
          <div className="name text-md capitalize">{name}</div>
          <div className="subname text-gray-500 text-xs">{subname}</div>
        </div>
        <div className="count">{count}</div>
      </li>
    </Link>
  );
}
