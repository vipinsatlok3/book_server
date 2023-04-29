import List from "@/components/List";
import { IBooksStatus } from "@/types/books";
import { getData } from "@/utils/fetch";

export const metadata = {
  title: "Books",
};

export default async function Books() {
  const res = await getData("/books")
  const { books, success } = (await res.json()) as IBooksStatus

  if (!books) throw new Error("no data found");
  if (!success) throw new Error();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold"> Book Seva List</h1>
      {books.length &&
        books?.map((item, index) => {
          const count = item.books.reduce(
            (total, item) => total + item.sell,
            0
          );

          return (
            <List
              name={item.place}
              _id={item._id}
              subname={new Date(item.date).toDateString() + ""}
              count={count}
              index={index}
              key={item._id}
            />
          );
        })}
    </div>
  );
}
