import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          FeedbackProduct
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/products">Produits</Link>
          </li>
          <li>
            <Link to="/users">Utilisateurs</Link>
          </li>
          <li>
            <Link to="/create-product">Nouveau Produit</Link>
          </li>
          <li>
            <Link to="/create-user">Nouvel Utilisateur</Link>
          </li>
          <li>
            <Link to="/create-feedback">Nouveau Feedback</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 