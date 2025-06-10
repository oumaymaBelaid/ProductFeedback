import { gql } from '@apollo/client';

// Mutations pour les utilisateurs
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Mutations pour les produits
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String!) {
    createProduct(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// Mutations pour les feedbacks
export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($userId: ID!, $productId: ID!, $rating: Int!, $comment: String!) {
    createFeedback(userId: $userId, productId: $productId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      user {
        id
        name
      }
      product {
        id
        name
      }
    }
  }
`; 