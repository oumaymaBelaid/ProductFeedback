import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_PRODUCTS, GET_ALL_USERS } from '../graphql/queries';

const Home = () => {
  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_ALL_PRODUCTS);
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_ALL_USERS);

  if (productsLoading || usersLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (productsError || usersError) {
    return <div className="error">Erreur lors du chargement des données</div>;
  }

  const products = productsData?.getAllProducts || [];
  const users = usersData?.getAllUsers || [];

  const totalFeedbacks = products.reduce((total, product) => total + (product.feedbacks?.length || 0), 0);
  const averageRating = products.length > 0 
    ? (products.reduce((total, product) => total + (product.averageRating || 0), 0) / products.length).toFixed(1)
    : 0;

  return (
    <div>
      <div className="card">
        <h1>Bienvenue sur FeedbackProduct</h1>
        <p>Plateforme de gestion des retours utilisateurs pour vos produits </p>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Produits</h3>
            <span className="rating-value">{products.length}</span>
          </div>
          <p>Nombre total de produits</p>
          <Link to="/products" className="btn btn-primary">Voir tous les produits</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Utilisateurs</h3>
            <span className="rating-value">{users.length}</span>
          </div>
          <p>Nombre total d'utilisateurs</p>
          <Link to="/users" className="btn btn-primary">Voir tous les utilisateurs</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Feedbacks</h3>
            <span className="rating-value">{totalFeedbacks}</span>
          </div>
          <p>Nombre total de retours</p>
          <Link to="/create-feedback" className="btn btn-primary">Ajouter un feedback</Link>
        </div>
      </div>

      <div className="card">
        <h3>Note moyenne globale</h3>
        <div className="rating">
          <span className="stars">{'★'.repeat(Math.round(averageRating))}</span>
          <span className="rating-value">{averageRating}/5</span>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Actions rapides</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/create-product" className="btn btn-success">Créer un nouveau produit</Link>
            <Link to="/create-user" className="btn btn-success">Ajouter un utilisateur</Link>
            <Link to="/create-feedback" className="btn btn-success">Soumettre un feedback</Link>
          </div>
        </div>

        <div className="card">
          <h3>Produits récents</h3>
          {products.slice(0, 3).map(product => (
            <div key={product.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.round(product.averageRating || 0))}</span>
                <span className="rating-value">{(product.averageRating || 0).toFixed(1)}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 