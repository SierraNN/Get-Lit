/** @format */

import { gql } from "@apollo/client";

export const MY_BOOKS = gql`
  query MyBooks {
    myBooks {
      _id
      title
      authors
      thumbnail
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
      friends {
        _id
        username
      }
      books {
        _id
        googleId
        title
        authors
        thumbnail
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
          googleId
          title
          authors
          thumbnail
          description
          categories
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
// export const MY_LISTS = gql`
//   query Query {
//     myLists {
//       _id
//       name
//       description
//       books {
//         _id
//         googleId
//         title
//         authors
//         thumbnail
//         description
//         categories
//       }
//       tags {
//         _id
//         text
//       }
//       comments {
//         _id
//         text
//       }
//     }
//   }
// `
export const MY_REVIEWS = gql`
  query myReviews {
    myReviews {
      _id
      books {
        _id
        googleId
        title
        authors
        thumbnail
        description
        categories
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
        googleId
        title
        authors
        thumbnail
        description
        categories
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
  }
`
export const GET_LISTS = gql`
  query GetLists($params: SearchParams) {
    getLists(params: $params) {
      totalDocs
      docs {
        _id
        name
        creator {
          _id
          username
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
          _id
          text
          author {
            _id
            username
          }
        }
      }
      totalPages
      page
    }
  }
`