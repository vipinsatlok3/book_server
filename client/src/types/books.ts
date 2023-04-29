export interface IBook {
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

export interface IBookAdd {
  place: string;
  date?: string;
  jeeneKiRan: string
  gyanGanga: string
}

export interface IBooksResponse {
  success: boolean;
  books: IBook[];
}

export interface IBookResponse {
  success: boolean;
  book: IBook[];
}


export interface IBookParams {
  params: {
    bookId: string;
  };
}
