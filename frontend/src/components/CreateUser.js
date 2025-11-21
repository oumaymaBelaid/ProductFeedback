import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { CREATE_USER } from '../graphql/mutations';
import { GET_ALL_USERS } from '../graphql/queries';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }],
    onCompleted: (data) => {
      navigate('/users');
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Veuillez entrer un email valide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createUser({
        variables: {
          name: formData.name.trim(),
          email: formData.email.trim()
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
          <h2>Créer un Nouvel Utilisateur</h2>
          <Link to="/users" className="btn btn-secondary">
            Retour aux utilisateurs
          </Link>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez le nom complet"
            />
            {errors.name && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="entrez@email.com"
            />
            {errors.email && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
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
              {loading ? 'Création...' : 'Créer l\'utilisateur'}
            </button>
            <Link to="/users" className="btn btn-secondary">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser; 