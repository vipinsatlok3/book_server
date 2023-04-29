import { IBookParams, IBookResponse, IBooks } from "@/types/books";
import { IUserParams, IUserResponce } from "@/types/users";
import { getTotalSell, getTotalSellWithFilter } from "@/utils/total";

async function getBook(bookId: string) {
    if (!bookId) return;
    const res = await fetch("https://zzdc92-3000.csb.app/api/users/" + bookId);
    return await res.json();
}

export default async function User({ params: { bookId } }: IBookParams) {
    const { book, success } = await getBook(bookId) as IBookResponse;
    if (!success) return new Error();

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold capitalize text-gray-900">{book.place}</h1>
            <div className="flex text-sm flex-col text-gray-200 bg-yellow-600 rounded p-4">
                <h2 className="text-xl mb-4 capitalize">
                    Sevadar Details
                </h2>
                <span>Date is - {new Date(book.date).toDateString()}</span>
            </div>
            <div className="flex text-gray-100 bg-blue-700 rounded p-4 flex-col">
                <h2 className="text-xl mb-4 capitalize">
                    Seva Details
                </h2>
                <h2 className="text-sm capitalize">
                    Total Gyan Ganga Seva : {getTotalSellWithFilter(book, "gyanGanga")}
                </h2>
                <h2 className="text-sm capitalize">
                    Total Jeene Ki Rah Seva : {getTotalSellWithFilter(book, "jeeneKiRah")}
                </h2>
                <h2 className="text-md mt-3 font-semibold capitalize">
                    Total Seva is : {getTotalSell(book.books)}
                </h2>
            </div>
        </div>
    )
}
