import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_FEEDBACK_BY_USER } from '../graphql/queries';

const UserDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_FEEDBACK_BY_USER, {
    variables: { userId: id }
  });

  if (loading) {
    return <div className="loading">Chargement des données utilisateur...</div>;
  }

  if (error) {
    return <div className="error">Erreur lors du chargement des données: {error.message}</div>;
  }

  const feedbacks = data?.getFeedbackByUser || [];

  // Calculer les statistiques de l'utilisateur
  const totalFeedbacks = feedbacks.length;
  const averageRating = totalFeedbacks > 0 
    ? (feedbacks.reduce((total, feedback) => total + feedback.rating, 0) / totalFeedbacks).toFixed(1)
    : 0;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Profil Utilisateur</h2>
          <Link to="/users" className="btn btn-secondary">
            Retour aux utilisateurs
          </Link>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <strong>Total de feedbacks:</strong> {totalFeedbacks}
          </div>
          
          <div className="rating" style={{ marginBottom: '15px' }}>
            <span className="stars">{'★'.repeat(Math.round(averageRating))}</span>
            <span className="rating-value">Note moyenne: {averageRating}/5</span>
          </div>
          
          <Link to={`/create-feedback?userId=${id}`} className="btn btn-success">
            Ajouter un feedback
          </Link>
        </div>
      </div>

      <div className="card">
        <h3>Feedbacks de l'utilisateur ({totalFeedbacks})</h3>
        
        {totalFeedbacks === 0 ? (
          <p>Cet utilisateur n'a pas encore soumis de feedback. <Link to={`/create-feedback?userId=${id}`}>Encouragez-le à donner son avis !</Link></p>
        ) : (
          <div>
            {feedbacks.map(feedback => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <span className="feedback-user">{feedback.product?.name || 'Produit inconnu'}</span>
                  <div className="rating">
                    <span className="stars">{'★'.repeat(feedback.rating)}</span>
                    <span className="rating-value">{feedback.rating}/5</span>
                  </div>
                </div>
                <p className="feedback-comment">{feedback.comment}</p>
                <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                  <Link to={`/products/${feedback.product?.id}`}>
                    Voir le produit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail; 