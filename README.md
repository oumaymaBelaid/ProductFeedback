# FeedbackProduct
API GraphQL pour Produits, Utilisateurs et Avis (avec données en mémoire)
Ceci est une API GraphQL simple construite avec Apollo Server et des données en mémoire (sans base de données).
Elle permet de gérer des utilisateurs, produits et avis avec des relations simulées, idéale pour des tests .

🛠️ Technologies utilisées

Backend :

Node.js - Runtime JavaScript côté serveur
Express.js - Framework web pour créer l'API REST/GraphQL
GraphQL
Apollo Server Express - Serveur GraphQL intégré à Express
GraphQL - Langage de requête et schéma pour l'API 
Données en mémoire

Frontend :

React.js
React 18 - Bibliothèque JavaScript pour l'interface utilisateur
Apollo Client - Client GraphQL pour React (pour les requêtes GraphQL)


 *Pour commencer

Cloner le dépôt


git clone https://github.com/houssembs99/FeedbackProduct.git  
cd FeedbackProduct

-Installer les dépendances
npm install  
-Démarrer le serveur
Le playground GraphQL sera disponible à l'adresse : http://localhost:4000/

 -Frontend (React.js)
-Créer une app React
-Installer Apollo Client
npm install @apollo/client graphql  

-Configurer Apollo Client

// src/ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql', // adapte si le port change
  cache: new InMemoryCache(),
});

export default client;

-Exemple de requête dans un composant React 

import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
    }
  }
`;

export default function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    pollInterval: 3000, // <-- interroge le serveur toutes les 3 secondes
    fetchPolicy: 'network-only' // <-- s'assure que les données sont toujours fraîches
  });

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  if (!data?.getAllProducts?.length) return <p>Aucun produit trouvé.</p>;

  return (
    <ul>
      {data.getAllProducts.map(product => (
        <li key={product.id}>
          <strong>{product.name}</strong>: {product.description}
        </li>
      ))}
    </ul>
  );
}

* GraphQL Schema 
-types
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

 -Queries
getAllUsers: [User]
    getAllProducts: [Product]
    getProduct(id: ID!): Product
    getFeedbackByProduct(productId: ID!): [Feedback]
    getFeedbackByUser(userId: ID!): [Feedback]
    getAllFeedbacks: [Feedback!]!
 -Mutations
 createUser(name: String!, email: String!): User
    createProduct(name: String!, description: String): Product
    createFeedback(userId: ID!, productId: ID!, rating: Int!, comment: String): Feedback
  }
-Exemple Query
Récupérer tous les produits
query {
  getAllProducts {
    id
    name
    description
    averageRating
  }
}
Récupérer tous les utilisateurs
query {
  getAllUsers {
    id
    name
    email
  }
}






