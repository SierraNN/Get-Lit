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
      bio
      username
      email
      spriteChoice
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
      pageSize
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
      bio
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
      tags {
        _id
        text
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
      pageSize
      page
    }
  }
`;

export const GET_CLUB = gql`
  query GetClub($id: ID!) {
    getClub(id: $id) {
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
  query getReview($id: ID!) {
    getReview(id: $id) {
      _id
      reviewTitle
      reviewText
      rating
      creator {
        _id
        username
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
        comments {
          _id
          author {
            _id
            username
          }
          createdAt
          text
        }
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
