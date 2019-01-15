import gql from 'graphql-tag';

export const LOGGED_USER = gql`
  query loggedUser {
    loggedUser {
      firstName
      lastName
      age
      email
    }
  }
`;
