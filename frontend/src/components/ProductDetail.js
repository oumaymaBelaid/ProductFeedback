import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_PRODUCT } from '../graphql/queries';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  if (loading) {
    return <div className="loading">Chargement du produit...</div>;
  }

  if (error) {
    return <div className="error">Erreur lors du chargement du produit: {error.message}</div>;
  }

  const product = data?.product;

  if (!product) {
    return <div className="error">Produit non trouvé</div>;
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>{product.name}</h2>
          <Link to="/products" className="btn btn-secondary">
            Retour aux produits
          </Link>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
            {product.description}
          </p>
          
          <div className="rating" style={{ marginBottom: '15px' }}>
            <span className="stars">{'★'.repeat(Math.round(product.averageRating || 0))}</span>
            <span className="rating-value">{(product.averageRating || 0).toFixed(1)}/5</span>
            <span style={{ marginLeft: '10px', color: '#666' }}>
              ({product.feedbacks?.length || 0} feedbacks)
            </span>
          </div>
          
          <Link to={`/create-feedback?productId=${product.id}`} className="btn btn-success">
            Ajouter un feedback
          </Link>
        </div>
      </div>

      <div className="card">
        <h3>Feedbacks ({product.feedbacks?.length || 0})</h3>
        
        {!product.feedbacks || product.feedbacks.length === 0 ? (
          <p>Aucun feedback pour ce produit. <Link to={`/create-feedback?productId=${product.id}`}>Soyez le premier à donner votre avis !</Link></p>
        ) : (
          <div>
            {product.feedbacks.map(feedback => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <span className="feedback-user">{feedback.user?.name || 'Utilisateur anonyme'}</span>
                  <div className="rating">
                    <span className="stars">{'★'.repeat(feedback.rating)}</span>
                    <span className="rating-value">{feedback.rating}/5</span>
                  </div>
                </div>
                <p className="feedback-comment">{feedback.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 