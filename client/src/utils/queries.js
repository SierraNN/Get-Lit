/** @format */

import { gql } from "@apollo/client";

export const MY_BOOKS = gql`
  query myBooks {
    _id
    title
    googleId
    authors
    description
  }
`;
export const MY_PROFILE = gql`
  query Query {
    myProfile {
      _id
      username
      email
      books {
        _id
        title
        authors
        urls
        description
        genre
      }
      lists {
        description
        tags {
          _id
          text
        }
        books {
          _id
          title
        }
        comments {
          _id
          text
        }
      }
      reviews {
        _id
        book {
          _id
          title
        }
      }
      clubs {
        _id
        name
      }
      tags {
        _id
        text
      }
    }
  }
`;
