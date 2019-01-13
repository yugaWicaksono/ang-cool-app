export interface Hello {
  hello: string;
}
export interface Query {
  hello: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Mutation {
  login: Login;
}
