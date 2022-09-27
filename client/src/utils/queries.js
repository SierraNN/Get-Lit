/** @format */

import { gql } from "@apollo/client";
import {
  BOOK_FIELDS,
  CLUB_FIELDS,
  COMMENT_FIELDS,
  LIST_FIELDS,
  PROFILE_FIELDS,
  REVIEW_FIELDS,
} from "./fragments";

export const MY_BOOKS = gql`
  ${BOOK_FIELDS}
  query MyBooks {
    myBooks {
      _id
      googleId
      title
      authors
      thumbnail
      description
      categories
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
export const GET_LISTS = gql`
  ${COMMENT_FIELDS}
  query GetLists($params: SearchParams) {
    getLists(params: $params) {
      totalDocs
      pageSize
      docs {
        _id
        name
        creator {
          _id
          username
          spriteChoice
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
        comments {
          ...CommentFields
        }
      }
      totalPages
      page
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
export const GET_USERS = gql`
  query GetUsers($params: SearchParams) {
    getUsers(params: $params) {
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

export const GET_CLUB = gql`
  ${CLUB_FIELDS}
  query GetClub($id: ID!) {
    getClub(id: $id) {
      ...ClubFields
    }
  }
`;
export const GET_CLUBS = gql`
  query Query($params: SearchParams) {
    getClubs(params: $params) {
      totalDocs
      pageSize
      docs {
        _id
        creator {
          _id
          username
        }
        name
        members {
          _id
          username
          spriteChoice
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
            _id
            username
          }
          createdAt
        }
      }
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
export const GET_REVIEWS = gql`
  query GetReviews($params: SearchParams) {
    getReviews(params: $params) {
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
          _id
          username
          spriteChoice
        }
        reviewTitle
        reviewText
      }
    }
  }
`;
