/** @format */

import { gql } from "@apollo/client";

export const SPRITE_FIELDS = gql`
  fragment SpriteFields on User {
      _id
      username
      spriteChoice
  }
`

export const COMMENT_FIELDS = gql`
  ${SPRITE_FIELDS}
  fragment CommentFields on Comment {
    _id
    text
    author {
      ...SpriteFields
    }
    createdAt
  }
`;
export const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    _id
    googleId
    title
    authors
    thumbnail
    description
    categories
    averageRating
    ratingCount
  }
`;

export const REVIEW_FIELDS = gql`
  ${SPRITE_FIELDS}
  ${BOOK_FIELDS}
  fragment ReviewFields on Review {
    _id
    reviewTitle
    reviewText
    rating
    creator {
      ...SpriteFields
    }
    rating
    book {
      ...BookFields
    }
    comments {
      _id
      text
      author {
        ...SpriteFields
      }
      createdAt
    }
    createdAt
  }
`;
export const CLUB_FIELDS = gql`
  ${COMMENT_FIELDS}
  ${SPRITE_FIELDS}
  fragment ClubFields on BookClub {
    _id
    creator {
      ...SpriteFields
    }
    members {
      ...SpriteFields
    }
    name
    description
    tags {
      _id
      text
    }
    posts {
      ...CommentFields
    }
  }
`;
export const LIST_FIELDS = gql`
  ${SPRITE_FIELDS}
  fragment ListFields on BookList {
    _id
    creator {
      ...SpriteFields
    }
    name
    description
    books {
      _id
      googleId
      title
      authors
      thumbnail
      description
      categories
    }
    tags {
      _id
      text
    }
    comments {
      _id
      text
      author {
        ...SpriteFields
      }
      createdAt
    }
  }
`;

export const PROFILE_FIELDS = gql`
  ${BOOK_FIELDS}
  ${REVIEW_FIELDS}
  ${CLUB_FIELDS}
  ${LIST_FIELDS}
  ${SPRITE_FIELDS}
  fragment ProfileFields on User {
    _id
    username
    spriteChoice
    bio
    following {
      ...SpriteFields
    }
    books {
      ...BookFields
    }
    reviews {
      ...ReviewFields
    }
    lists {
      ...ListFields
    }
    clubs {
      ...ClubFields
    }
    tags {
      _id
      text
    }
  }
`;

export const SEARCH_RESULTS = gql`
  fragment SearchResults on SearchResults {
    term
    type
    page
    pageSize
    totalDocs
    totalPages
  }
`