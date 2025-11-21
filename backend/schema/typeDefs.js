// schema/typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    feedbacks: [Feedback]
  }

  type Product {
    id: ID!
    name: String!
    description: String
    feedbacks: [Feedback]
    averageRating: Float
  }

  type Feedback {
    id: ID!
    rating: Int!
    comment: String
    date: String
    user: User
    product: Product
  }

  type Query {
    getAllUsers: [User!]!
    getAllProducts: [Product!]!
    product(id: ID!): Product
    feedbacks: [Feedback!]!
    feedback(id: ID!): Feedback
    user(id: ID!): User
    getFeedbackByUser(userId: ID!): [Feedback!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createProduct(name: String!, description: String): Product
    createFeedback(userId: ID!, productId: ID!, rating: Int!, comment: String): Feedback
  }
`;

module.exports = typeDefs;
