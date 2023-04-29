import { IUserParams, IUserResponce } from "@/types/users";

async function getUser(userId: string) {
  if (!userId) return;
  const res = await fetch("https://zzdc92-3000.csb.app/api/users/" + userId);
  return await res.json();
}

export default async function User({ params: { userId } }: IUserParams) {
  const { user, success } = (await getUser(userId)) as IUserResponce;
  if (!success) return new Error();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold capitalize text-gray-900">{user.name}</h1>
      <div className="flex text-sm flex-col text-gray-200 bg-yellow-600 rounded p-4">
        <h2 className="text-xl mb-4 capitalize">
          Sevadar Details
        </h2>
        <span>Number is - {user.number}</span>
        <span>Password is - {user.password}</span>
        <span>Role is - <span className="capitalize">{user.role}</span></span>
      </div>
      <div className="flex text-gray-100 bg-blue-700 rounded p-4 flex-col">
        <h2 className="text-xl mb-4 capitalize">
          Seva Details
        </h2>
        <h2 className="text-sm capitalize">
          Total Gyan Ganga Seva : {user.role}
        </h2>
        <h2 className="text-sm capitalize">
          Total Jeene Ki Rah Seva : {user.role}
        </h2>
        <h2 className="text-md mt-3 font-semibold capitalize">
          Total Seva is : {user.role}
        </h2>
      </div>
    </div>
  );
}
