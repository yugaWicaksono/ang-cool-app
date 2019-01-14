export interface LoggedUser {
  firstName: string;
  lastName: string;
  name: string;
  age: number;
  email: string;
}

export interface Query {
  loggedUser: LoggedUser;
}
