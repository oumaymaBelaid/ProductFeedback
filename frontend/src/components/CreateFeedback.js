import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { CREATE_FEEDBACK } from '../graphql/mutations';
import { GET_ALL_USERS, GET_ALL_PRODUCTS } from '../graphql/queries';

const CreateFeedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    userId: searchParams.get('userId') || '',
    productId: searchParams.get('productId') || '',
    rating: 5,
    comment: ''
  });
  const [errors, setErrors] = useState({});

  // Récupérer les utilisateurs et produits
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS);
  const { data: productsData, loading: productsLoading } = useQuery(GET_ALL_PRODUCTS);

  const [createFeedback, { loading }] = useMutation(CREATE_FEEDBACK, {
    onCompleted: (data) => {
      navigate('/products');
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(rating)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.userId) {
      newErrors.userId = 'Veuillez sélectionner un utilisateur';
    }
    if (!formData.productId) {
      newErrors.productId = 'Veuillez sélectionner un produit';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Le commentaire est requis';
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'La note doit être entre 1 et 5';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createFeedback({
        variables: {
          userId: formData.userId,
          productId: formData.productId,
          rating: formData.rating,
          comment: formData.comment.trim()
        }
      });
    } catch (error) {
      // L'erreur est gérée dans onError
    }
  };

  if (usersLoading || productsLoading) {
    return <div className="loading">Chargement...</div>;
  }

  const users = usersData?.getAllUsers || [];
  const products = productsData?.getAllProducts || [];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Créer un Nouveau Feedback</h2>
          <Link to="/" className="btn btn-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId" className="form-label">
              Utilisateur *
            </label>
            <select
              id="userId"
              name="userId"
              className="form-control"
              value={formData.userId}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un utilisateur</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            {errors.userId && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.userId}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="productId" className="form-label">
              Produit *
            </label>
            <select
              id="productId"
              name="productId"
              className="form-control"
              value={formData.productId}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un produit</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productId && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.productId}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Note *
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  style={{
                    background: 'none',
                    border: '2px solid #ddd',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: rating <= formData.rating ? '#ffc107' : '#ddd',
                    backgroundColor: rating <= formData.rating ? 'rgba(255, 193, 7, 0.1)' : 'transparent'
                  }}
                >
                  ★
                </button>
              ))}
              <span style={{ marginLeft: '10px', fontWeight: '600' }}>
                {formData.rating}/5
              </span>
            </div>
            {errors.rating && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              Commentaire *
            </label>
            <textarea
              id="comment"
              name="comment"
              className="form-control"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Partagez votre expérience avec ce produit..."
            />
            {errors.comment && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.comment}</div>}
          </div>

          {errors.submit && (
            <div className="error" style={{ marginBottom: '20px' }}>
              {errors.submit}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Soumettre le feedback'}
            </button>
            <Link to="/" className="btn btn-secondary">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedback; 