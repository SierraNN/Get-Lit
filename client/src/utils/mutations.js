/** @format */

import { gql } from "@apollo/client";
import { CLUB_FIELDS, COMMENT_FIELDS, LIST_FIELDS, REVIEW_FIELDS } from "./fragments";
import { BOOK_FIELDS } from './fragments';

/**
 * AUTH mutations
 */
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

/**
 * PROFILE mutations
 */
export const UPDATE_USER_TAGS = gql`
  mutation UpdateUserTags($tags: [String]) {
    updateUserTags(tags: $tags) {
      _id
      text
    }
  }
`;
export const UPDATE_BIO = gql`
  mutation UpdateBio($bio: String) {
    updateBio(bio: $bio)
  }
`;
export const UPDATE_SPRITE = gql`
  mutation UpdateSprite($spriteChoice: Int) {
    updateSprite(spriteChoice: $spriteChoice)
  }
`;
export const ADD_FOLLOWING = gql`
  mutation AddFollowing($followingId: ID) {
    addFollowing(followingId: $followingId) {
      _id
      username
      spriteChoice
    }
  }
`;
export const REMOVE_FOLLOWING = gql`
  mutation RemoveFollowing($followingId: ID) {
    removeFollowing(followingId: $followingId) {
      _id
      username
    }
  }
`;
export const SAVE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation saveBook($book: BookInfo) {
    saveBook(book: $book) {
      ...BookFields
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId)
  }
`;
export const JOIN_CLUB = gql`
  mutation joinClub($id: ID) {
    joinClub(id: $id)
  }
`;
export const LEAVE_CLUB = gql`
  mutation leaveClub($id: ID) {
    leaveClub(id: $id)
  }
`;

export const CREATE_LIST = gql`
  ${LIST_FIELDS}
  mutation CreateList($list: CreateList) {
    createList(list: $list) {
      ...ListFields
    }
  }
`;
export const CREATE_REVIEW = gql`
  ${REVIEW_FIELDS}
  mutation createReview($review: CreateReview) {
    createReview(review: $review) {
      ...ReviewFields
    }
  }
`;
export const CREATE_CLUB = gql`
  ${CLUB_FIELDS}
  mutation CreateClub($club: CreateClub) {
    createClub(club: $club) {
      ...ClubFields
    }
  }
`;

/**
 * Managing Books in Lists/Clubs
 */

export const ADD_BOOK_TO_LIST = gql`
  ${LIST_FIELDS}
  mutation AddBookToList($listId: ID, $book: BookInfo) {
    addBookToList(listId: $listId, book: $book) {
      ...ListFields
    }
  }
`;
export const REMOVE_BOOK_FROM_LIST = gql`
  ${LIST_FIELDS}
  mutation removeBookFromList($listId: ID, $bookId: ID){
    removeBookFromList(listId:$listId, bookId:$bookId){
      ...ListFields
    }
  }
`
export const ADD_BOOK_TO_CLUB = gql`
  ${CLUB_FIELDS}
  mutation AddBookToClub($clubId: ID, $book: BookInfo) {
    addBookToClub(clubId: $clubId, book: $book) {
      ...ClubFields
    }
  }
`;
export const REMOVE_BOOK_FROM_CLUB = gql`
  ${CLUB_FIELDS}
  mutation removeBookFromClub($clubId: ID, $bookId: ID){
    removeBookFromClub(clubId:$clubId, bookId:$bookId){
      ...ClubFields
    }
  }
`


export const ADD_COMMENT_TO_LIST = gql`
  ${COMMENT_FIELDS}
  mutation Mutation($listId: ID, $comment: String) {
    addCommentToList(listId: $listId, comment: $comment) {
      ...CommentFields
    }
  }
`;
export const ADD_COMMENT_TO_REVIEW = gql`
  ${COMMENT_FIELDS}
  mutation Mutation($reviewId: ID, $comment: String) {
    addCommentToReview(reviewId: $reviewId, comment: $comment) {
      ...CommentFields
    }
  }
`;
export const ADD_POST_TO_CLUB = gql`
  ${COMMENT_FIELDS}
  mutation Mutation($clubId: ID, $post: String) {
    addPostToClub(clubId: $clubId, post: $post) {
      ...CommentFields
    }
  }
`;

/** COMMENTS / POSTS */
export const EDIT_CLUB_POST = gql`
  mutation EditClubPost($clubId: ID, $commentId: ID, $text: String) {
    editClubPost(clubId: $clubId, commentId: $commentId, text: $text)
  }
`;
export const REMOVE_CLUB_POST = gql`
  mutation RemoveClubPost($clubId: ID, $commentId: ID) {
    removeClubPost(clubId: $clubId, commentId: $commentId)
  }
`;
export const EDIT_LIST_COMMENT = gql`
  mutation EditListComment($listId: ID, $commentId: ID, $text: String) {
    editListComment(listId: $listId, commentId: $commentId, text: $text)
  }
`;
export const REMOVE_LIST_COMMENT = gql`
  mutation RemoveListComment($listId: ID, $commentId: ID) {
    removeListComment(listId: $listId, commentId: $commentId)
  }
`;
export const EDIT_REVIEW_COMMENT = gql`
  mutation EditReviewComment($reviewId: ID, $commentId: ID, $text: String) {
    editReviewComment(reviewId: $reviewId, commentId: $commentId, text: $text)
  }
`;
export const REMOVE_REVIEW_COMMENT = gql`
  mutation RemoveReviewComment($reviewId: ID, $commentId: ID) {
    removeReviewComment(reviewId: $reviewId, commentId: $commentId)
  }
`;

// export const UPDATE