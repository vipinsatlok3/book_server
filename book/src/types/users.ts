export interface IUser {
  _id: string;
  name: string;
  role: string;
  number: number | string;
  password: string;
  count: number;
}

export interface IUserLogin {
  number: string;
  password: string;
}

export interface IUserResponce {
  success: boolean;
  user: IUser;
}

export interface IUserParams {
  params: {
    userId: string;
  };
}
