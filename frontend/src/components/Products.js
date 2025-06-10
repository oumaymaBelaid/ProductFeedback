import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

const Products = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  if (loading) {
    return <div className="loading">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="error">Erreur lors du chargement des produits: {error.message}</div>;
  }

  const products = data?.getAllProducts || [];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Liste des Produits</h2>
          <Link to="/create-product" className="btn btn-success">
            Nouveau Produit
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="card">
          <p>Aucun produit trouvé. <Link to="/create-product">Créer le premier produit</Link></p>
        </div>
      ) : (
        <div className="grid grid-2">
          {products.map(product => (
            <div key={product.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{product.name}</h3>
                <div className="rating">
                  <span className="stars">{'★'.repeat(Math.round(product.averageRating || 0))}</span>
                  <span className="rating-value">{(product.averageRating || 0).toFixed(1)}/5</span>
                </div>
              </div>
              
              <p style={{ marginBottom: '15px', color: '#666' }}>
                {product.description}
              </p>
              
              <div style={{ marginBottom: '15px' }}>
                <strong>Feedbacks:</strong> {product.feedbacks?.length || 0}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/products/${product.id}`} className="btn btn-primary">
                  Voir détails
                </Link>
                <Link to={`/create-feedback?productId=${product.id}`} className="btn btn-secondary">
                  Ajouter feedback
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products; 