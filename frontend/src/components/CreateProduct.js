import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { CREATE_PRODUCT } from '../graphql/mutations';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
    onCompleted: (data) => {
      navigate(`/products/${data.createProduct.id}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description du produit est requise';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createProduct({
        variables: {
          name: formData.name.trim(),
          description: formData.description.trim()
        }
      });
    } catch (error) {
      // L'erreur est gérée dans onError
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Créer un Nouveau Produit</h2>
          <Link to="/products" className="btn btn-secondary">
            Retour aux produits
          </Link>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom du produit *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez le nom du produit"
            />
            {errors.name && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez le produit..."
            />
            {errors.description && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.description}</div>}
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
              {loading ? 'Création...' : 'Créer le produit'}
            </button>
            <Link to="/products" className="btn btn-secondary">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct; 