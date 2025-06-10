import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ALL_USERS } from '../graphql/queries';

const Users = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <div className="loading">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="error">Erreur lors du chargement des utilisateurs: {error.message}</div>;
  }

  const users = data?.getAllUsers || [];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Liste des Utilisateurs</h2>
          <Link to="/create-user" className="btn btn-success">
            Nouvel Utilisateur
          </Link>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="card">
          <p>Aucun utilisateur trouvé. <Link to="/create-user">Créer le premier utilisateur</Link></p>
        </div>
      ) : (
        <div className="grid grid-2">
          {users.map(user => (
            <div key={user.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{user.name}</h3>
              </div>
              
              <p style={{ marginBottom: '15px', color: '#666' }}>
                <strong>Email:</strong> {user.email}
              </p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/users/${user.id}`} className="btn btn-primary">
                  Voir détails
                </Link>
                <Link to={`/create-feedback?userId=${user.id}`} className="btn btn-secondary">
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

export default Users; 