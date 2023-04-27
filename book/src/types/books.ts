export interface IBooks {
  _id: string;
  place: string;
  date: string;
  userId: string;
  createdAt: string;
  books: {
    name: string;
    sell: number;
  }[];
}

export interface IBook {
  place: string;
  date: string;
  jeeneKiRah: number | string;
  gyanGanga: number | string;
}
