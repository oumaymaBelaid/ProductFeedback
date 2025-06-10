import { gql } from '@apollo/client';

// Requêtes pour les utilisateurs
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
    }
  }
`;

// Requêtes pour les produits
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
      averageRating
      feedbacks {
        id
        rating
        comment
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      averageRating
      feedbacks {
        id
        rating
        comment
        user {
          id
          name
        }
      }
    }
  }
`;

// Requêtes pour les feedbacks
export const GET_FEEDBACK_BY_PRODUCT = gql`
  query GetFeedbackByProduct($productId: ID!) {
    getFeedbackByProduct(productId: $productId) {
      id
      rating
      comment
      user {
        id
        name
        email
      }
      product {
        id
        name
      }
    }
  }
`;

export const GET_FEEDBACK_BY_USER = gql`
  query GetFeedbackByUser($userId: ID!) {
    getFeedbackByUser(userId: $userId) {
      id
      rating
      comment
      product {
        id
        name
        description
      }
    }
  }
`; 