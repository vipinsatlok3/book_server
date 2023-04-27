import List from "@/components/List";
import { IUser } from "@/types/users";

export const metadata = {
  title: "Users",
};

export default async function Users() {
  const res = await fetch("https://3d9q07-3000.csb.app/api/users");
  const { users, success } = (await res.json()) as {
    success: boolean;
    users: IUser[];
  };

  if (!users.length) throw new Error("no data found");
  if (!success) throw new Error();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold"> Users List</h1>
      {users.length &&
        users?.map((item, index) => {
          return (
            <List
              name={item.name}
              _id={item._id}
              subname={item.number + " - " + item.password}
              count={0}
              index={index}
              key={item._id}
            />
          );
        })}
    </div>
  );
}
