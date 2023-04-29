import { IBook } from "@/types/books";

export const getTotalSell = (array: { name: string; sell: number }[]) => {
    return array.reduce((acc, item) => (acc + item.sell), 0) as number;
}

export const getTotalSellWithFilter = (array: IBooks, book: "jeeneKiRah" | "gyanGanga") => {
    const filter = array.books.filter(item => item.name === "jeeneKiRah") as { name: string; sell: number }[];
    return getTotalSell(filter)
}