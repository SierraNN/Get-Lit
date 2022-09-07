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
      following {
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
`;
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
`;
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
`;
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
`;
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      spriteChoice
      following {
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
      }
      lists {
        _id
        name
        description
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
              email
              spriteChoice
            }
            books {
              _id
              googleId
              title
              authors
              thumbnail
              description
              categories
              ebooks {
                link
                free
              }
            }
            lists {
              _id
              creator {
                _id
                username
                email
                spriteChoice
              }
              name
              description
              comments {
                _id
                text
                createdAt
              }
            }
            reviews {
              _id
              book {
                _id
                googleId
                title
                authors
                thumbnail
                description
                categories
              }
              reviewText
              suggestedBooks {
                _id
                googleId
                title
                authors
                thumbnail
                description
                categories
              }
              suggestedTags {
                _id
                text
              }
              rating
            }
            clubs {
              _id
              members {
                _id
                username
                email
                spriteChoice
              }
              name
              description
              posts {
                _id
                text
                createdAt
              }
            }
            tags {
              _id
              text
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
        following {
          _id
          username
        }
        spriteChoice
      }
      totalPages
      page
    }
  }
`;
