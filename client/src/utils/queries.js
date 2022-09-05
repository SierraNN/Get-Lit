/** @format */

import { gql } from "@apollo/client";

export const MY_BOOKS = gql`
  query MyBooks {
    myBooks {
      _id
      title
      authors
      urls
      description
      categories
    }
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
        googleId
        title
        authors
        urls
        description
        categories
      }
      lists {
        _id
        name
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
export const MY_LISTS = gql`
  query Query {
    myLists {
      _id
      name
      description
      books {
        _id
        title
      }
      tags {
        _id
        text
      }
      comments {
        _id
        text
      }
    }
  }
`
export const MY_REVIEWS = gql`
  query myReviews {
    myReviews {
      _id
      book {
        _id
        title      
      }
      reviewText
      rating
      comments {
        _id
        author {
          _id
          username
        }
        text
      }
    }
  }
`
export const MY_CLUBS = gql`
  query myClubs {
    myClubs {
      _id
      creator {
        _id
        username
      }
      name
      description
      tags {
        _id
        text
      }
      books {
        _id
        title
      }
      lists {
        _id
        name
      }
      posts {
        _id
        text
      }
    }
  }
`
export const GET_LIST = gql`
  query getList($id: ID!) {
    getList(id: $id) {
      _id
      creator {
        _id
        username
      }
      name
      description
      books {
        _id
        googleId
        title
        authors
        urls
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
        _id
        text
        author {
          _id
          username
        }
      }
    }
  }
`