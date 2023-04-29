export interface IUser {
  _id: string;
  name: string;
  role: string;
  number: string;
  password: string;
}

export interface IUserAdd {
  name: string;
  number: string;
}

export interface IUserLogin {
  number: string;
  password: string;
}

export interface IUserResponce {
  success: boolean;
  user: IUser;
}

export interface IUsersResponce {
  success: boolean;
  users: IUser[];
}

export interface IUserParams {
  params: {
    userId: string;
  };
}
