/** @format */

import { gql } from "@apollo/client";
import {
  BOOK_FIELDS,
  CLUB_FIELDS,
  LIST_FIELDS,
  PROFILE_FIELDS,
  REVIEW_FIELDS,
  SPRITE_FIELDS,
} from "./fragments";

export const MY_BOOKS = gql`
  ${BOOK_FIELDS}
  query MyBooks {
    myBooks {
      ...BookFields
    }
  }
`;
export const MY_PROFILE = gql`
  ${PROFILE_FIELDS}
  query Query {
    myProfile {
      ...ProfileFields
    }
  }
`;


export const GET_LIST = gql`
  ${LIST_FIELDS}
  query getList($id: ID!) {
    getList(id: $id) {
      ...ListFields
    }
  }
`;
export const GET_USER = gql`
  ${PROFILE_FIELDS}
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ...ProfileFields
    }
  }
`;
export const GET_CLUB = gql`
  ${CLUB_FIELDS}
  query GetClub($id: ID!) {
    getClub(id: $id) {
      ...ClubFields
    }
  }
`;
export const GET_REVIEW = gql`
  ${REVIEW_FIELDS}
  query getReview($id: ID!) {
    getReview(id: $id) {
      ...ReviewFields
    }
  }
`;
export const GET_BOOK = gql`
  ${BOOK_FIELDS}
  query getBook($id: ID!) {
    getBook(id: $id) {
      ...BookFields
    }
  }
`

export const GET_REVIEWS = gql`
  ${SPRITE_FIELDS}
  query GetReviews($params: SearchParams) {
    getReviews(params: $params) {
      term
      type
      totalDocs
      pageSize
      docs {
        _id
        rating
        book {
          _id
          googleId
          title
          thumbnail
        }
        creator {
          ...SpriteFields
        }
        reviewTitle
        reviewText
      }
    }
  }
`;
export const GET_LISTS = gql`
  ${SPRITE_FIELDS}
  query GetLists($params: SearchParams) {
    getLists(params: $params) {
      term
      type
      totalDocs
      pageSize
      docs {
        _id
        name
        creator {
          ...SpriteFields
        }
        description
        books {
          _id
          googleId
          title
          authors
          thumbnail
          description
          categories
          tags {
            _id
            text
          }
        }
        tags {
          _id
          text
        }
      }
      totalPages
      page
    }
  }
`;
export const GET_CLUBS = gql`
  ${SPRITE_FIELDS}
  query Query($params: SearchParams) {
    getClubs(params: $params) {
      term
      type
      totalDocs
      pageSize
      docs {
        _id
        creator {
          ...SpriteFields
        }
        name
        members {
          ...SpriteFields
        }
        description
        tags {
          _id
          text
        }
        posts {
          _id
          text
          author {
            ...SpriteFields
          }
          createdAt
        }
      }
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers($params: SearchParams) {
    getUsers(params: $params) {
      term
      type
      totalDocs
      docs {
        _id
        username
        spriteChoice
      }
      totalPages
      pageSize
      page
    }
  }
`;

