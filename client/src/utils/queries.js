import { gql } from "@apollo/client";

export const MY_BOOKS = gql`
  query myBooks {
    _id
    title
    googleId
    authors
    description
  }
`
export const MY_PROFILE = gql`
  query myProfile {
    _id
    books
  }
`