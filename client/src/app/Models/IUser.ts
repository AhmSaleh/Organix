export interface IUser {
  _id: string;
  email: string;
  hash: string;
  name: { first: string; last: string };
  role: string;
}
