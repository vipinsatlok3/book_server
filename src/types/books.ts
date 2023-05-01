export interface IBook {
  userId: string;
  place: string;
  date: string;
  books: {
    name: string;
    sell: number;
  }[];
}
