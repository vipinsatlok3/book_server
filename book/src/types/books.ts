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

export interface IBooksStatus {
  success: boolean;
  books: IBooks[];
}

export interface IBookResponse {
  success: boolean;
  book: IBooks;
}


export interface IBookParams {
  params: {
    bookId: string;
  };
}
