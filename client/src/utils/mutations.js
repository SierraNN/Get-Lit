import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username:String!,$password:String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`
export const ADD_USER = gql`
  mutation addUser($username:String!, $email:String!,$password:String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`
export const UPDATE_USER_TAGS = gql`
  mutation UpdateUserTags($tags: [String]) {
    updateUserTags(tags: $tags) {
      _id
      text
    }
  }
`
export const UPDATE_BIO = gql`
  mutation UpdateBio($bio: String) {
    updateBio(bio: $bio) 
  }
`
export const UPDATE_SPRITE = gql`
  mutation UpdateSprite($spriteChoice: Int) {
    updateSprite(spriteChoice: $spriteChoice) 
  }
`
export const ADD_FOLLOWING = gql`
  mutation AddFollowing($followingId:ID) {
    addFollowing(followingId: $followingId){
      _id
      username
      spriteChoice
    }
  }
`
export const REMOVE_FOLLOWING = gql`
  mutation RemoveFollowing($followingId:ID) {
    removeFollowing(followingId: $followingId){
      _id
      username
    }
  }
`
export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInfo) {
    saveBook(book: $book) {
      _id
      title
      authors
      description
      googleId
      categories
    }
  }
`
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId)
  }
`

export const CREATE_LIST = gql`
  mutation CreateList($list: CreateList) {
    createList(list: $list) {
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
      }
    }
  }
`
export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReview) {
    createReview(review: $review) {
      _id
      book {
        _id
      }
      reviewText
      rating
      suggestedBooks {
        _id
      }
      suggestedTags {
        _id
      }
    }
  }
`
export const CREATE_CLUB = gql`
  mutation CreateClub($club: CreateClub) {
    createClub(club: $club) {
      _id
      creator {
        _id
        email
        username
        clubs {
          _id
          name
        }
      }
      members {
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
      }
      lists {
        _id
        name
        description
        comments {
          _id
          text
        }
      }
      posts {
        _id
        text
        author {
          _id
          username
          email
        }
        replies {
          _id
          text
        }
      }
    }
  }
`
export const ADD_BOOK_TO_LIST = gql`
  mutation AddBookToList($listId: ID, $book: BookInfo) {
    addBookToList(listId: $listId, book: $book) {
      _id
      creator {
        _id
        username
        email
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
          email
        }
        replies {
          _id
          text
        }
      }
    }
  }
`
export const ADD_COMMENT_TO_LIST = gql`
  mutation Mutation($listId: ID, $comment: String) {
    addCommentToList(listId: $listId, comment: $comment) {
      _id
      text
      author {
        _id
        username
      }
      createdAt
    }
  }
`
export const ADD_COMMENT_TO_REVIEW = gql`
  mutation Mutation($reviewId: ID, $comment: String) {
    addCommentToReview(reviewId: $reviewId, comment: $comment) {
      _id
      text
      author {
        _id
        username
      }
      createdAt
    }
  }
`
export const ADD_POST_TO_CLUB = gql`
  mutation Mutation($clubId: ID, $post: String) {
    addPostToClub(clubId: $clubId, post: $post) {
      _id
      text
      author {
        _id
        username
      }
      createdAt
    }
  }
`