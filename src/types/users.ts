export interface IUser {
  _id: string;
  name: string;
  number: string;
  password: string;
  role: "admin" | "user";
}
