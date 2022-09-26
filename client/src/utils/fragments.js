/** @format */

import { gql } from "@apollo/client";

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    _id
    text
    author {
      _id
      username
      spriteChoice
    }
    createdAt
  }
`
export const PROFILE_FIELDS = gql`
  fragment ProfileFields on User {
    _id
    username
    spriteChoice
    bio
    following {
      _id
      username
      spriteChoice
    }
    books {
      _id
      googleId
      title
      authors
      thumbnail
      description
    }
    reviews {
      _id
      reviewTitle
      book {
        _id
        title
        googleId
        thumbnail
      }
      creator {
        _id
        username
        spriteChoice
      }
    }
    lists {
      _id
      name
      description
      creator {
        _id
        username
        spriteChoice
      }
      books {
        _id
        googleId
        title
        thumbnail
      }
      tags {
        _id
        text
      }
      comments {
        _id
        text
        author {
          _id
          username
          email
          following {
            _id
            username
            spriteChoice
          }
          spriteChoice
        }
        createdAt
        replies {
          _id
          text
          createdAt
        }
      }
    }
    clubs {
      _id
      name
      creator {
        _id
        username
        spriteChoice
      }
    }
    tags {
      _id
      text
    }
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
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    _id
    reviewTitle
    reviewText
    rating
    creator {
      _id
      username
      spriteChoice
    }
    rating
    book {
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
    comments {
      _id
      text
      author {
        _id
        username
      }
      createdAt
    }
    createdAt
  }
`;
export const CLUB_FIELDS = gql`
  ${COMMENT_FIELDS}
  fragment ClubFields on BookClub {
    _id
    creator {
      _id
      username
      spriteChoice
    }
    members {
      _id
      username
      spriteChoice
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
  fragment ListFields on BookList {
    _id
    creator {
      _id
      username
      spriteChoice
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
        _id
        username
      }
      createdAt
    }
  }
`;
